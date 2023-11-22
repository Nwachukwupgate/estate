const FormWrapper = (props) => {
    return (
      <form onSubmit={ event => props?.onSubmit?.({event}) }>
        <fieldset>
          <legend>{props?.title}:</legend>
          {props?.children}
        </fieldset> 
      </form>
      );
  };
  
  export default FormWrapper;