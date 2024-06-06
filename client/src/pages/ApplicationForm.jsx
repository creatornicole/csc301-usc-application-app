import React, { useState } from 'react'
import { boolean, z } from 'zod'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
// get possible team positions
import { possiblePositions } from '../helper/positions.js';

/*

Contains form to apply for membership:

Handles input field validation on client-side
Displays error messages
Handles Submit/ Post Request to server

*/
function ApplicationForm() {

    const location = useLocation();

    // change title according to location.state
    const toUpdate = location.state !== null;
    let title = "";
    if (toUpdate) {
        // admin is updating existing application
        title = "Update Application";
    } else {
        // user is applying
        title = "Apply for a Membership";
    }

    // State Variables
    const positionPlaceholder = "Change to your desired position...";
    const [formData, setFormData] = useState({
        id: location.state?.applicationId ?? "",
        name: location.state?.initialName ?? "",
        birthdate: location.state?.initialBirthdate ?? "",
        phonenumber: location.state?.initialPhonenumber ?? "",
        address: location.state?.initialAddress ?? "",
        abbr: location.state?.initialAbbr ? location.state?.initialAbbr + "@hs-mittweida.de" : "",
        course: location.state?.initialCourse ?? "",
        seminargroup: location.state?.initialSeminargroup ?? "",
        position: location.state?.initialPosition ? 
                    Object.keys(possiblePositions).find(
                        key => possiblePositions[key] === location.state?.initialPosition
                    ) :
                    positionPlaceholder
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState(''); // display server-side error

    // Set validation schema
    const applicationSchema = z.object({
        name: z.string().trim()
            .min(1, { message: 'Name is required.'}),
        birthdate: z.string().trim()
            .min(1, { message: 'Date of Birth is required.'})
            .regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: 'Birthdate must be in the format DD/MM/YYYY'}),
        phonenumber: z.string().trim()
            .min(1, { message: 'Phone Number is required.'}),
        address: z.string().trim()
            .min(1, { message: 'Address During Studies is required'}),
        abbr: z.string().trim()
            .min(1, { message: 'University Mailing Address is required'})
            .endsWith('@hs-mittweida.de', { message: 'Only @hs-mittweide.de mail addresses allowd.' }),
        course: z.string().trim()
            .min(1, { message: 'Course of Study is required'}),
        seminargroup: z.string().trim()
            .min(1, { message: 'Seminargroup is required'})
            .max(9, { message: 'Seminargroup must be in the format IF21wS1-B' }),
        position: z.string().refine(value => { // only the defined positions should be selected
            return value in possiblePositions;
        }, {
            message: 'Select a valid position.'
        })
    });

    // Update state variables anytime the value of an input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    // Validate all input fields and display error messages of errors that occur
    const handleValidation = () => {
        const validation = applicationSchema.safeParse(formData);
        if(!validation.success) {
            const occuredErrors = validation.error.errors;

            let errorId;
            occuredErrors.forEach(function(error) {
                errorId = getErrorPath(error.path[0]);
                displayErrMsg(errorId, error.message);
            })
            return false;
        }
        return true;
    }

    // Called when form is submitted, sends form data to express server if input is all valid
    const handleSubmit = async (e) => {
        e.preventDefault() // stop default behavior of reloading the page
        // reset error messages
        document.querySelectorAll('.error').forEach(element => {
            element.innerHTML = '';
        });

        // perform input validation before sending data to server
        if(handleValidation()) {
            // send data to server if all input is validated on client-side
            try {
                if (toUpdate) {
                    // update application entry in database
                    console.log(`${import.meta.env.VITE_SERVER_API}/update/${formData.id}`);
                    const response = await axios.put(`${import.meta.env.VITE_SERVER_API}/update/${formData.id}`, formData);
                    setSuccessMsg('<i class="fa-solid fa-check"></i> Application successfully updated');
                } else {
                    // add new application to database
                    const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/apply`, formData);
                    setSuccessMsg('<i class="fa-solid fa-check"></i> Application successfully submitted');
                }
                // reset form and show message in case of successful submission
                resetForm();
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    let validationErr = error.response.data.errors;
                    // display server-side validation errors in the form
                    let errorId;
                    validationErr.forEach(error => {
                        errorId = getErrorPath(error.path);
                        displayErrMsg(errorId, error.msg);
                    });
                } else {
                    setErrMsg(`<i class="fa-solid fa-xmark"></i> Error submitting form data, please contact us.`);
                }
            }
        }
    }

    // clear all labels after successfully submitting
    const resetForm = () => {
        setFormData({
            name: "",
            birthdate: "",
            phonenumber: "",
            address: "",
            abbr: "",
            course: "",
            seminargroup: "",
            position: positionPlaceholder
        });
    }

    // get path to determine where to display occured error
    const getErrorPath = (errPath) => {
        let errorId = '';
        switch(errPath) {
            case 'name':
                errorId = 'inputName';
                break;
            case 'birthdate':
                errorId = 'inputBirthdate';
                break;
            case 'phonenumber':
                errorId = 'inputPhonenumber';
                break;
            case 'address':
                errorId = 'inputAddress';
                break;
            case 'abbr':
                errorId = 'inputAbbr';
                break;
            case 'course':
                errorId = 'inputCourse';
                break;
            case 'seminargroup':
                errorId = 'inputSeminargroup';
                break;
            case 'position':
                errorId = 'inputPosition';
                break;
        }
        return errorId;
    }

    // display error message in specified element
    const displayErrMsg = (errPath, errMsg) => {
        if(errPath && !document.querySelector(`#${errPath} .error`).innerHTML) {
            document.querySelector(`#${errPath} .error`).innerHTML = `
                <i class="fa-solid fa-xmark"></i> ${errMsg}
            `;
        }
    }

    // content of component: display form
    return (
        <div className="mainContent">
            <h1>{title}</h1>
            <Form id="applicationForm" onSubmit={handleSubmit}>
                <Form.Group id="inputName" className="form-group">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} />
                    <Form.Text className="inputError error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputBirthdate" className="form-group">
                    <Form.Label htmlFor="birthdate">Date of Birth (DD/MM/YYYY):</Form.Label>
                    <Form.Control type="text" name="birthdate" id="birthdate" value={formData.birthdate} onChange={handleInputChange} />
                    <Form.Text className="inputError error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputPhonenumber" className="form-group">
                    <Form.Label htmlFor="phonenumber">Phone Number:</Form.Label>
                    <Form.Control type="text" name="phonenumber" id="phonenumber" value={formData.phonenumber} onChange={handleInputChange} />
                    <Form.Text className="inputError error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputAddress" className="form-group">
                    <Form.Label htmlFor="address">Address During Studies:</Form.Label>
                    <Form.Control type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} />
                    <Form.Text className="inputError error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputAbbr" className="form-group"> 
                    <Form.Label htmlFor="abbr">University Mailing Address (vsurname@hs-mittweida.de):</Form.Label>
                    <Form.Control type="text" name="abbr" id="abbr" value={formData.abbr} onChange={handleInputChange} />
                    <Form.Text className="inputError error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputCourse" className="form-group">
                    <Form.Label htmlFor="course">Course of Study:</Form.Label>
                    <Form.Control type="text" name="course" id="course" value={formData.course} onChange={handleInputChange} />
                    <Form.Text className="inputError error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputSeminargroup" className="form-group">
                    <Form.Label htmlFor="seminargroup">Seminar Group (IF21wS1-B):</Form.Label>
                    <Form.Control type="text" name="seminargroup" id="seminargroup" value={formData.seminargroup} onChange={handleInputChange} />
                    <Form.Text className="inputError error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputPosition" className="form-group">
                    <Form.Label htmlFor="position">Desired Position:</Form.Label>
                    <Form.Select name="position" id="position" value={formData.position} onChange={handleInputChange}>
                        <option value={positionPlaceholder} disabled>{positionPlaceholder}</option> {/* Placeholder */}
                        <option value="battery">{possiblePositions['battery']}</option>
                        <option value="pcbs">{possiblePositions['pcbs']}</option> 
                        <option value="harness">{possiblePositions['harness']}</option>
                        <option value="bms">{possiblePositions['bms']}</option>
                        <option value="can">{possiblePositions['can']}</option>
                        <option value="vcu">{possiblePositions['vcu']}</option>
                        <option value="dynamics">{possiblePositions['dynamics']}</option>
                        <option value="mechanics">{possiblePositions['mechanics']}</option>
                        <option value="bodywork">{possiblePositions['bodywork']}</option>
                        <option value="cr">{possiblePositions['cr']}</option>
                        <option value="bp">{possiblePositions['bp']}</option>
                        <option value="photo">{possiblePositions['photo']}</option>
                        <option value="layout">{possiblePositions['layout']}</option>
                        <option value="socialmedia">{possiblePositions['socialmedia']}</option>
                        <option value="organisation">{possiblePositions['organisation']}</option>
                        <option value="sponsoring">{possiblePositions['sponsoring']}</option>
                    </Form.Select>
                    <Form.Text className="inputError error"></Form.Text>
                </Form.Group>
                
                <div className="submit-section">
                    <Button type="submit" variant='primary'>Submit</Button>
                    {successMsg && <p className="success" dangerouslySetInnerHTML={{ __html: successMsg }}></p>}
                    {errMsg && <p className="error" dangerouslySetInnerHTML={{ __html: errMsg }}></p>}
                </div>
            </Form>
        </div>
    );
}

export default ApplicationForm