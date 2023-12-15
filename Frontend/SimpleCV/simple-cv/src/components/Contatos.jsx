import { useEffect, useState } from "react";
import 'flowbite';
import "../index.css"
import ShowToast from "./ShowToast";

let nextId = 0;
const TextAreaStyle = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const LabelStyle = "text-center pb-5 md:text-lg font-semibold leading-relaxed text-gray-800 dark:text-white";

function Contatos(props) {
    const [Email, setEmail] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [Link, setLink] = useState('');
    const [Links, setLinks] = useState([]);

    function Validate(){
        if(Email.trim().length === 0){
            ShowToast("Email está vazio");
        } 
        if(Telefone.trim().length === 0){
            ShowToast("Telefone está vazio");
        } 
        if(Link.trim().length === 0){
            ShowToast("Link está vazio");
        } 
        else
        {
            setLinks([
                ...Links, {
                    Link: Link,
                    id: nextId++
                }
            ]);  
        }
    }

    useEffect(() => {
        props.UpdateContato(Email,Telefone,Links);
        setEmail("");
        setTelefone("");
        setLink("");
    }, [Links]);

    function ShowList(){
        return (
            <ul className=" mb-8 md:mb-0 bg-white rounded-lg mr-5 bg-opacity-25 md:flex md:flex-wrap">
                    {Links.map(links => (
                        <li className="p-2" key={links.id}>
                            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="break-all mb-2 underline text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ links.Link }</h5>
                                <button type="button" onClick={ () => {
                                        setLinks(
                                            Links.filter(a => a.id !== links.id)
                                        ); }}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Remover
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
        )
    }


    return (
        <div className="bg-sky-200 p-8 rounded-lg bg-opacity-80 ">
            <h2 className="text-center pb-5 md:text-4xl font-semibold leading-relaxed text-gray-900 dark:text-white">Contato</h2>
            <div className="w-full">
                <ShowList/>          
                <div className="w-full">
                    <label htmlFor='' className={LabelStyle} >Email</label>  
                    <input type='text' className={TextAreaStyle} onChange={ e => { 
                        setEmail(e.target.value);
                    }}/>
                    <br/>
                    <label htmlFor='' className={LabelStyle} >Telefone</label>  
                    <input type='text' className={TextAreaStyle} onChange={ e => { 
                        setTelefone(e.target.value);
                    }}/>
                    <br/>
                    <label htmlFor='' className={LabelStyle} >Link</label>
                    <input type='text' className={TextAreaStyle} onChange={ e => { 
                        setLink(e.target.value);
                    }}/>
                    <br/>

                    <div className="flex justify-center ">
                        <button type="button" onClick={Validate}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Adicionar mais um link
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contatos;