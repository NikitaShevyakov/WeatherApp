import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchPanel = (props) => {  

  return (
      <InputGroup className="mb-3">
          <Form.Control
              placeholder="Enter city/town..."
              aria-label="Enter city/town..."
              aria-describedby="basic-addon2"
              onChange={(e) => props.onChange(e.target.value)}
          />
          <Button variant="danger" id="button-addon2" onClick={props.onSubmit}>Search</Button>
      </InputGroup>
  );  
}

export default SearchPanel;
