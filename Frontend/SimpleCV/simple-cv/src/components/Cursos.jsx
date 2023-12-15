import { useEffect, useState } from "react";
import 'flowbite';
import "../index.css"
import ShowToast from "./ShowToast";

let nextId = 0;
const TextAreaStyle = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const LabelStyle = "text-center pb-5 md:text-lg font-semibold leading-relaxed text-gray-800 dark:text-white";


function Cursos(props) {
    const [NomeDoCurso, setNomeDoCurso] = useState('');
    const [Instituição, setInstituição] = useState('');
    const [CargaHoraria, setCargaHoraria] = useState('');
    const [Cursos, setCursos] = useState([]);

    function Validate(){
        let isCorrect = true;
        if(NomeDoCurso.trim().length === 0){
            ShowToast("Nome está vazio");
            isCorrect = false;
        } 
        if(Instituição.trim().length === 0){
            ShowToast("Instituição está Vazia");
            isCorrect = false;
        }
        if(CargaHoraria.trim().length === 0){
            ShowToast("Carga Horária está vazia");
            isCorrect = false;
        } 
        if(isNaN(CargaHoraria)){
            ShowToast("Carga Horária deve ser um número");
            isCorrect = false;
        } 

        if(isCorrect)
        {
            setCursos([
                ...Cursos, {
                    NomeDoCurso: NomeDoCurso,
                    Instituição: Instituição,
                    CargaHoraria: CargaHoraria,
                    id: nextId++
                }
            ]); 
        }        
    }

    useEffect(() => {
        props.UpdateCursos(Cursos);
        setNomeDoCurso("");
        setInstituição("");
        setCargaHoraria("");

        var inputs = document.querySelectorAll('input');
        inputs.forEach(element => {
            element.value = "";
        });

        var texts = document.querySelectorAll('textarea');
        texts.forEach(element => {
            element.value = "";
        });

    }, [Cursos]);

    

    function ShowList(){
        return (
            <ul className="md:w-1/2 mb-8 md:mb-0 bg-white rounded-lg mr-5 bg-opacity-25">
    
                    
                    {Cursos.map(cursos => (
                        <li className="p-2" key={cursos.id}>
                            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="break-all mb-2 underline text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ cursos.NomeDoCurso }</h5>
                                <p className="break-all mb-3 font-normal text-gray-700 dark:text-gray-400"> {cursos.Instituição} </p>
                                <p className="break-all mb-3 font-normal text-gray-700 dark:text-gray-400"> {cursos.CargaHoraria} </p>
                                <button type="button" onClick={ () => {
                                        setCursos(
                                            Cursos.filter(a => a.id !== cursos.id)
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

    if(Cursos.length > 0) {
        return (
            <div className="bg-sky-200 p-8 rounded-lg bg-opacity-80 ">
                <h2 className="text-center pb-5 md:text-4xl font-semibold leading-relaxed text-gray-900 dark:text-white">Cursos</h2>
                <div className="w-full md:flex">
                    <ShowList/>          
                    <div className="md:w-1/2">
                        <label htmlFor='' className={LabelStyle} >Nome Do Curso</label>
                    
                        <input type='text' className={TextAreaStyle} onChange={ e => { 
                            setNomeDoCurso(e.target.value);
                        }}/>
                        <br/>
                        <label htmlFor='' className={LabelStyle} >Instituição</label>
                        <input type='text' className={TextAreaStyle} onChange={ e => { 
                            setInstituição(e.target.value);
                        }}/>
                        <br/>
                        <label htmlFor='' className={LabelStyle} >Carga Horária</label>
                        <input type='text' className={TextAreaStyle} onChange={ e => { 
                            setCargaHoraria(e.target.value);
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
                <h2 className="text-center pb-5 md:text-4xl font-semibold leading-relaxed text-gray-900 dark:text-white">Cursos</h2>
                <div className="w-full flex">
                    <div className="w-full">
                        <label htmlFor='' className={LabelStyle} >Nome Do Curso</label>
                    
                        <input type='text' className={TextAreaStyle} onChange={ e => { setNomeDoCurso(e.target.value) }}/>
                        <br/>
                        <label htmlFor='' className={LabelStyle} >Instituição</label>
                        <input type='text' className={TextAreaStyle} onChange={ e => { setInstituição(e.target.value) }}/>
                        <br/>
                        <label htmlFor='' className={LabelStyle} >Carga Horária</label>
                        <input type='text' className={TextAreaStyle} onChange={ e => { setCargaHoraria(e.target.value) }}/>
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

export default Cursos;