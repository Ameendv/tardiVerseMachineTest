import * as yup from 'yup'


export const signupSchema = yup.object().shape({
    username: yup.string().min(4, "Name should be minimum 4 letters").required("Enter your name"),
   
    email: yup
      .string()
      .lowercase()
      .email("Must be a valid email!")
  
      .required("Email is Required!"),
      number: yup
      .string()
      .required("Mobile Number is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Enter a valid number"
      )
      .min(10, "Enter a valid number")
      .max(10, "Enter a valid number"),
    password: yup
      .string()
      .min(8, "Password should be Minimum 8 characters !")
      .required("Required!")
      .matches(/(?=.*[a-z])/, "one lowercase required!")
      .matches(/(?=.*[A-Z])/, "one uppercase required!")
      .matches(/(?=.*[0-9])/, "one number required!"),
    
  });


  export const loginSchema = yup.object().shape({
    
   
    email: yup
      .string()
      .lowercase()
      .email("Must be a valid email!")
  
      .required("Email is Required!"),
     
    password: yup
      .string()
     
      .required("Required!")
      
    
  });
