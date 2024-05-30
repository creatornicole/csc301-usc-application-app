import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import { z } from 'zod'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

function ApplicationForm() {
    // State Variables
    const positionPlaceholder = "Change to your desired positon...";
    const [formData, setFormData] = useState({
        name: "",
        birthdate: "",
        phonenumber: "",
        address: "",
        abbr: "",
        course: "",
        seminargroup: "",
        position: positionPlaceholder
    });

    const [successMsg, setSuccessMsg] = useState('');

    // Set possible positions to choose from
    const possiblePositions = {
        battery: 'Battery', // DE: Akku
        pcbs: 'Circuit Boards', // DE: Platinen
        harness: 'Wire Harness', // DE: Kabelbaum
        bms: 'Battery Management System (BMS)', // DE: BMS
        can: 'CAN&Data', // DE: CAN&Data
        vcu: 'Vehicle Control Unit (VCU)', // DE: VCU
        dynamics: 'Driving Dynamics', // DE: Fahrdynamik
        mechanics: 'Mechanical Drive', // DE: Mechanischer Antrieb
        bodywork: 'Bodywork', // DE: Karosserie
        cr: 'Cost Report', // DE: Cost Report
        bp: 'Business Plan', // DE: Business Plan
        photo: 'Photo/Video', // DE: Foto/Video
        layout: 'Layout', // DE: Layout
        socialmedia: 'Social Media', // DE: Öffentlichkeitsarbeit
        organisation: 'Organisation', // DE: Organisation
        sponsoring: 'Sponsoring' // DE: Sponsoring
    }

    // Set validation schema
    // TODO: add max to validate with db setting or do this in server?
    const applicationSchema = z.object({
        name: z.string().trim()
            .min(1, { message: 'Name is required.'}),
        birthdate: z.string().trim()
            .min(1, { message: 'Date of Birth is required.'})
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Birthdate must be in the format YYYY-MM-DD'}), ///^\d{2}\.\d{2}\.\d{4}$/
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
            console.log(occuredErrors);

            let errorId;
            occuredErrors.forEach(function(error) {
                switch(error.path[0]) {
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
                if(errorId && !document.querySelector(`#${errorId} .error`).innerHTML) {
                    document.querySelector(`#${errorId} .error`).innerHTML = `
                        <i class="fa-solid fa-xmark"></i> ${error.message}
                    `;
                    errorId = '';
                }
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
            // send data to server if all input is valid
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/apply`, formData);
                console.log('Form data submitted successfully:', response.data);
                // reset form and show message in case of successful submission
                resetForm();
                setSuccessMsg('<i class="fa-solid fa-check"></i> Application successfully submitted');
            } catch (error) {
                console.log('Error submitting form data:', error);
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

    // content of component: display form
    return (
        <div>
            <h1>Apply for a Membership</h1>
            <Form id="applicationForm" onSubmit={handleSubmit}>
                <Form.Group id="inputName" className="form-group">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} />
                    <Form.Text className="error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputBirthdate" className="form-group">
                    <Form.Label htmlFor="birthdate">Date of Birth (DD/MM/YYYY):</Form.Label>
                    <Form.Control type="text" name="birthdate" id="birthdate" value={formData.birthdate} onChange={handleInputChange} />
                    <Form.Text className="error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputPhonenumber" className="form-group">
                    <Form.Label htmlFor="phonenumber">Phone Number:</Form.Label>
                    <Form.Control type="text" name="phonenumber" id="phonenumber" value={formData.phonenumber} onChange={handleInputChange} />
                    <Form.Text className="error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputAddress" className="form-group">
                    <Form.Label htmlFor="address">Address During Studies:</Form.Label>
                    <Form.Control type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} />
                    <Form.Text className="error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputAbbr" className="form-group"> 
                    <Form.Label htmlFor="abbr">University Mailing Address (vsurname@hs-mittweida.de):</Form.Label>
                    <Form.Control type="text" name="abbr" id="abbr" value={formData.abbr} onChange={handleInputChange} />
                    <Form.Text className="error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputCourse" className="form-group">
                    <Form.Label htmlFor="course">Course of Study:</Form.Label>
                    <Form.Control type="text" name="course" id="course" value={formData.course} onChange={handleInputChange} />
                    <Form.Text className="error"></Form.Text>
                </Form.Group>

                <Form.Group id="inputSeminargroup" className="form-group">
                    <Form.Label htmlFor="seminargroup">Seminar Group (IF21wS1-B):</Form.Label>
                    <Form.Control type="text" name="seminargroup" id="seminargroup" value={formData.seminargroup} onChange={handleInputChange} />
                    <Form.Text className="error"></Form.Text>
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
                    <Form.Text className="error"></Form.Text>
                </Form.Group>
                
                <div className="submit-section">
                    <Button type="submit" variant='primary'>Submit</Button>
                    {successMsg && <p className="success" dangerouslySetInnerHTML={{ __html: successMsg }}></p>}
                </div>
            </Form>
        </div>
        // maybe useNavigate to handle form submission
    );
}

export default ApplicationForm