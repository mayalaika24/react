import React from "react"

export type InputType = {
    value: string | undefined,
    name: string,
    type: 'text' | 'password' | 'email',
    label?: string ,
    placeholder: string,
    validation?: string
}

export type Children = React.ReactNode

export type ButtonType = {
    loading?: boolean,
    text: string,
    onClick: () => void,
    className?: string,
    primary?: boolean
}

export type Product = {
    id: number,
    name: string,
    image: string
}

export type Drug = {
    id: number,
    name: string,
    image: string
}

export type OnChange = (val: any) => any

export type Column<T> = {
  field: keyof T;
  label: string;
}

export type UserData = {
    id: number,
    userName: string,
    token: string,
    image: string | null,
    phoneNumber: string,
    canViewDrug: boolean
}

export type Event = React.ChangeEvent<HTMLInputElement>;

export type Route = {
    title: string,
    path: string
}

export type VoidFunc = () => void;