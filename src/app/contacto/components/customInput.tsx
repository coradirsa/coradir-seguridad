import { Controller, Control, FieldErrors, ControllerRenderProps, ControllerFieldState, UseFormStateReturn } from "react-hook-form";
import { FormSchema } from "./formSchema";
import { JSX } from "react";
type ControllerRenderArg = {
    field: ControllerRenderProps<FormSchema, keyof FormSchema>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FormSchema>;
  };
export default function CustomInput({
    name,
    label,
    type,
    control,
    errors,
    ref, 
}:{
    name:keyof FormSchema,
    label:string,
    type:string,
    control:Control<FormSchema>,
    errors:FieldErrors<FormSchema>,
    ref:React.RefObject<HTMLInputElement | HTMLTextAreaElement | null  >,
}){
    let render: (e: ControllerRenderArg) => JSX.Element;
    switch(type){ 
        case "textarea":
            render = (e)=>(
                <textarea
                    {...e.field}
                    id={name}
                    ref={ref as React.RefObject<HTMLTextAreaElement>}
                    className="bg-white/60 rounded-tr-2xl rounded-bl-2xl text-red w-full p-5 md:h-40 focus:outline-none"
                />
            );
            break;
        default:
            render = (e)=>(
                <input
                    type={type}
                    {...e.field}
                    id={name}
                    ref={ref as React.RefObject<HTMLInputElement>}
                    className="bg-white/60 rounded-tr-2xl rounded-bl-2xl text-red w-full p-5 focus:outline-none"
                />
            );
            break;
    }
    return(
        <Controller 
            name={name}
            control={control}
            render={(e)=>{
                return (
                    <div className="flex flex-col items-center justify-center gap-2 py-4 text-white w-full">
                        <label htmlFor={name} className=" text-2xl w-full">{label}</label>
                        {render(e)}
                        {errors[name] && <p className="text-white text-shadow text-sm mt-2 h-5 text-left w-full">
                            {(errors[name].message)}*
                        </p>}
                    </div>
                );
            }} 
        />
    );
}