import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios'

function ApplicationForm() {

    const positionPlaceholder = "Change to your desired positon...";
    const [formData, setFormData] = useState({
        name: "",
        birthdate: "2002/07/30",
        phonenumber: "",
        address: "",
        abbr: "",
        course: "",
        seminargroup: "",
        position: positionPlaceholder
    });

    /* Called anytime the value of the input changes. */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    /* Called when form is submitted, sends form data to express server */


    const handleSubmit = async (e) => {
        e.preventDefault() // stop default behavior of loading the page
        console.log(formData) // logs form data
        console.log(typeof(formData));

        // send form data to express server
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/apply`, formData);
            console.log('Form data submitted successfully:', response.data);
        } catch (error) {
            console.log('Error submitting form data:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Apply for a Membership</h1>
            <Link to="/intranet">Login</Link>
            <br />

            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange}/>
            <br />

            <label htmlFor="birthdate">Date of Birth (DD/MM/YYYY):</label>
            <input type="text" name="birthdate" id="birthdate" value={formData.birthdate} onChange={handleInputChange}/>
            <br />

            <label htmlFor="phonenumber">Phone Number:</label>
            <input type="text" name="phonenumber" id="phonenumber" value={formData.phonenumber} onChange={handleInputChange}/>
            <br />

            <label htmlFor="address">Address During Studies:</label>
            <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange}/>
            <br />

            <label htmlFor="abbr">University Mailing Address (vsurname@hs-mittweida.de):</label>
            <input type="text" name="abbr" id="abbr" value={formData.abbr} onChange={handleInputChange}/>
            <br />

            <label htmlFor="course">Course of Study:</label>
            <input type="text" name="course" id="course" value={formData.course} onChange={handleInputChange}/>
            <br />

            <label htmlFor="seminargroup">Seminar Group (IF21wS1-B):</label>
            <input type="text" name="seminargroup" id="seminargroup" value={formData.seminargroup} onChange={handleInputChange}/>
            <br />

            <label htmlFor="position">Desired Position:</label>
            <select name="position" id="position" value={formData.position} onChange={handleInputChange}>
                <option value={positionPlaceholder} disabled>{positionPlaceholder}</option> {/* Placeholder */}
                <option value="battery">Battery</option> {/* DE: Akku */}
                <option value="pcbs">Circuit Boards</option> {/* DE: Platinen */}
                <option value="harness">Wire Harness</option> {/* DE: Kabelbaum */}
                <option value="bms">Battery Management System (BMS)</option> {/* DE: BMS */}
                <option value="can">CAN&Data</option> {/* DE: CAN&Data */}
                <option value="vcu">Vehicle Control Unit (VCU)</option> {/* DE: VCU */}
                <option value="dynamics">Driving Dynamics</option> {/* DE: Fahrdynamik */}
                <option value="mechanics">Mechanical Drive</option> {/* DE: Mechanischer Antrieb */}
                <option value="bodywork">Bodywork</option> {/* DE: Karosserie */}
                <option value="cr">Cost Report</option> {/* DE: Cost Report */}
                <option value="bp">Business Plan</option> {/* DE: Business Plan */}
                <option value="photo">Photo/Video</option> {/* DE: Foto/Video */}
                <option value="layout">Layout</option> {/* DE: Layout */}
                <option value="socialmedia">Social Media</option> {/* DE: Öffentlichkeitsarbeit */}
                <option value="organisation">Organisation</option> {/* DE: Organisation */}
                <option value="sponsoring">Sponsoring</option> {/* DE: Sponsoring */}
            </select>

            {/* following <p> only for debugging purposes */}
            <p>Name Value: {formData.name} <br />
                Birthdate: {formData.birthdate} <br />
                Phone Number: {formData.phonenumber} <br />
                Address: {formData.address} <br />
                HS-Abbr: {formData.abbr} <br />
                Course: {formData.course} <br />
                Seminargroup: {formData.seminargroup} <br />
                Position: {formData.position} <br />
            </p>

            <input type="submit" value="Submit" />
        </form>
        /* maybe useNavigate to handle form submission */
    );
}

export default ApplicationForm