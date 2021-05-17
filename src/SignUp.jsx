import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const urlBase = process.env.NODE_ENV === 'http://localhost:8000'
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

async function signUpUser(info) {
  return fetch(urlBase+'/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  })
  .then(data => data.json())
}

function SignUp(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [warning, setWarning] = useState(false);

    const handleSubmit = async e => {
      e.preventDefault();
      if(!emailRegexp.test(email)){
        setWarning("Please enter a valid email address")
      }else if(password!==confirmPassword){
        setWarning("Passwords do not match");
        setConfirmPassword("");
        setPassword("");
      }else if(password===""){
        setWarning("Password cannot be empty");
      }else{
        const response = await signUpUser({
          email,
          password,
          confirmPassword,
        });

        console.log(response);

        if(response.errors){
          setWarning(response.errors[0].error);
          setPassword("");
          setConfirmPassword("");
          setEmail("");
        }else{
          setWarning(false);
          sessionStorage.setItem("user", JSON.stringify(response.result));
        }
      }
    }

    return (
      <div>
        <Modal 
        show = {true}
        centered>

          <Modal.Body>
          {warning && <Alert variant="danger">{warning}</Alert>}
          <Form>
                <Form.Group controlId="formEmail">
                    <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Control type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button block variant="primary" onClick={handleSubmit}>Continue</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

export default SignUp;