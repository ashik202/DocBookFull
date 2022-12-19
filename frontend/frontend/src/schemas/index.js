import * as Yup from "yup"
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const singUpSchema = Yup.object({
    firstname:Yup.string().min(2).max(25).required("Enter the first name"),
    lastname:Yup.string().min(2).max(25).required("Enter the last name"),
    email:Yup.string().email().required("enter the email"),
    phoneno:Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    password:Yup.string().min(6).required("Enter the password"),
    
    passwordConfirmation: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('Required'),

});

export const LoginSchemas=Yup.object({
    email:Yup.string().required("Enter Email."),
    password:Yup.string().required("Enter Password")
    
});
export const DoctorSignUpSchema = Yup.object({
    firstname:Yup.string().min(2).max(25).required("Enter the first name"),
    lastname:Yup.string().min(2).max(25).required("Enter the last name"),
    email:Yup.string().email().required("enter the email"),
    phoneno:Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    password:Yup.string().min(6).required("Enter the password"),
    
    passwordConfirmation: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('Required'),

});