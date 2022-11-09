import { FormItemRule } from 'naive-ui'

export function validateEmail(rule: FormItemRule, email: string): boolean {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? true : false
}

export function validatePhoneNumber(rule: FormItemRule,phoneNumber: string ) : boolean {
  return  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneNumber) ? true : false
}