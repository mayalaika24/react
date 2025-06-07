import validator from 'validator';
import { InputType } from '../types';
export function handleFormData (object: any): any {
    const keys = Object.keys(object);
    let payload: any = {};
    keys.forEach(key => {
        payload[key] = object[key].value
    })
    return JSON.stringify(payload || {});
}

export function handleSetDataForm (prevState: any, type: string, value: number | string) {
    return ({ ...prevState, [ type ]: { ...prevState[ type ], value } })
}

export function handleFieldValidation (object: InputType, comparedValue: string = '') {
    if(object.validation === 'password') {
        return validator.isStrongPassword(String(object.value))
    } else if (object.validation === 'confirm') {
        return object.value === comparedValue
    } else {
        return object.value ? true : false
    }
}

export function handleFormValidation (object: any, comparedValue: string = '') {
    const keys = Object.keys(object);
    return keys.find(key => {
        return !handleFieldValidation(object[key], comparedValue)
    })

}