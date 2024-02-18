import style from "./TextInput.module.css"

export default function TextInput(props){
    return(
        
            <div className={style.inputTextWrapper}>
                <input {...props}/>
            </div>
        
    )
}