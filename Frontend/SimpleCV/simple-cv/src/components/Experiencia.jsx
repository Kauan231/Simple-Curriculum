import { useEffect, useState } from "react";
import 'flowbite';
import "../index.css"
import ShowToast from "./ShowToast";

let nextId = 0;
const TextAreaStyle = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const LabelStyle = "text-center pb-5 md:text-lg font-semibold leading-relaxed text-gray-800 dark:text-white";

function Experiencias(props) {
    const [NomeDaEmpresa, setNomeDaEmpresa] = useState('');
    const [Inicio, setInicio] = useState('');
    const [Fim, setFim] = useState('');
    const [Descrição, setDescrição] = useState('');
    const [experiencias, setExperiencia] = useState([]);

    function Validate(){
        let isCorrect = true;
        if(NomeDaEmpresa.trim().length === 0){
            ShowToast("Nome está vazio");
            isCorrect = false;
        } 
        if(Inicio.trim().length === 0 || Fim.trim().length === 0) {
            ShowToast("Preencha o periodo");
            isCorrect = false;
        }
        if(new Date(Fim) < new Date(Inicio)) {
            ShowToast("Data de encerramento menor do que Inicio");
            isCorrect = false;
        }
        if(Descrição.trim().length === 0){
            ShowToast("Descrição está Vazia");
            isCorrect = false;
        } 

        if(isCorrect)
        {
            setExperiencia([
                ...experiencias, {
                    NomeDaEmpresa: NomeDaEmpresa,
                    Inicio: Inicio,
                    Fim: Fim,
                    Descrição: Descrição,
                    id: nextId++
                }
            ]);
        }
    }

    useEffect(()=>{
        props.UpdateExperiencias(experiencias);
        setNomeDaEmpresa("");
        setInicio("");
        setFim("");
        setDescrição("");
    }, [experiencias])

    function ShowList() {
        return (
        <ul className="md:w-1/2 mb-8 md:mb-0 bg-white rounded-lg mr-5 bg-opacity-25">
            {experiencias.map(experiencia => (
                <li className="p-2" key={experiencia.id}>
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="break-all mb-2 underline text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ experiencia.NomeDaEmpresa }</h5>
                        <h6 className="break-all mb-2  font-bold tracking-tight text-gray-900 dark:text-white">{ "(" + experiencia.Inicio + " | " + experiencia.Fim + ")"} </h6>
                        <p className="break-all mb-3 font-normal text-gray-700 dark:text-gray-400"> {experiencia.Descrição} </p>
                        <button type="button" onClick={ () => {
                                setExperiencia(
                                    experiencias.filter(a => a.id !== experiencia.id)
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

    if(experiencias.length > 0) {
        return (
            <div className="bg-sky-200 p-8 rounded-lg bg-opacity-80 ">
                <h2 className="text-center pb-5 md:text-4xl font-semibold leading-relaxed text-gray-900 dark:text-white">Experiências</h2>
                <div className="w-full md:flex">
                    <ShowList/>
                    <div className="md:w-1/2">
                        <label htmlFor='' className={LabelStyle} >Nome Da Empresa</label>
                    
                        <input type='text' name="nomedaempresa" className={TextAreaStyle} onChange={ e => { 
                            setNomeDaEmpresa(e.target.value); 
                            }}/>
                        <br/>
                        <div date-rangepicker className=" pt-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <input name="start" type="date" onChange={ e => { 
                                    setInicio(e.target.value); 
                                    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
                            </div>
                            <span className="mx-4 text-gray-500">a</span>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <input name="end" type="date" onChange={ e => { 
                                    setFim(e.target.value);
                                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>
                            </div>
                        </div>
                    
    
                        <br/>
                        <label htmlFor='' className={LabelStyle} >Descrição</label>
                        <textarea type='text' name="nomedaempresa" rows="4" className={TextAreaStyle} onChange={ e => { 
                            setDescrição(e.target.value);
                            }}/>
                        <br/>
                        <div className="flex justify-center ">
                            <button type="button" onClick={Validate} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Adicionar
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="bg-sky-200 p-8 rounded-lg bg-opacity-80 ">
                <h2 className="text-center pb-5 md:text-4xl font-semibold leading-relaxed text-gray-900 dark:text-white">Experiências</h2>
                <div className="w-full flex">
                    <div className="w-full">
                        <label htmlFor='' className={LabelStyle} >Nome Da Empresa</label>
                    
                        <input type='text' name="nomedaempresa" className={TextAreaStyle} onChange={ e => { 
                            setNomeDaEmpresa(e.target.value); 
                            }}/>
                        <br/>
                        <div date-rangepicker className=" pt-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <input name="start" type="date" onChange={ e => { 
                                    setInicio(e.target.value);
                                    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
                            </div>
                            <span className="mx-4 text-gray-500">a</span>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                                <input name="end" type="date" onChange={ e => { 
                                    setFim(e.target.value);
                                    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>
                            </div>
                        </div>
                    
    
                        <br/>
                        <label htmlFor='' className={LabelStyle} >Descrição</label>
                        <textarea type='text' name="nomedaempresa" rows="4" className={TextAreaStyle} onChange={ e => { 
                            setDescrição(e.target.value);
                            }}/>
                        <br/>
                        <div className="flex justify-center ">
                            <button type="button" onClick={Validate} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Adicionar
                            </button> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Experiencias;