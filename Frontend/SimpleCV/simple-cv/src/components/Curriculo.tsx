import { ToastContainer } from 'react-toastify'
import '../index.css'
import 'react-toastify/dist/ReactToastify.css'
import Experiencias from './Experiencia'
import Educacoes from './Educação';
import Cursos from './Cursos';
import Habilidades from './Habilidades';
import Contatos from './Contatos';
import ShowToast from './ShowToast';
import Axios from 'axios';
import { useState } from 'react';

const TextAreaStyle = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

function Curriculo() {
    const [Nome, setNome] = useState('');
    const [Perfil, setPerfil] = useState('');
    let _email;
    let _telefone;
    let _links;
    let _cursos;
    let _habilidades;
    let _educacoes;
    let _experiencias;

    function UpdateContato(email, telefone, links) {
        _email = email;
        _telefone = telefone;
        _links = links.map(({id, ...rest}) => { return rest.Link});
    }

    function UpdateCursos(cursos){
        _cursos = cursos.map(({id, ...rest}) => { return rest});
    }

    function UpdateHabilidades(habilidades){
        _habilidades = habilidades.map(({id, ...rest}) => { return rest.NomeDaHabilidade});
    }

    function UpdateEducacoes(educacoes){
        _educacoes = educacoes.map(({id, ...rest}) => { return rest});
        console.log(_educacoes);
    }

    function UpdateExperiencias(experiencias){
        _experiencias = experiencias.map(({id, ...rest}) => { return rest});
    }

    async function ValidateAllFields(){
        let isCorrect = true;
        if(_experiencias.length === 0) {
            ShowToast("Campo Experiencias Vazio")
            isCorrect = false;
        }
        if(_educacoes.length === 0) {
            ShowToast("Campo Educação Vazio")
            isCorrect = false;
        }
        if(_cursos.length === 0) {
            ShowToast("Campo Cursos Vazio")
            isCorrect = false;
        }
        if(_habilidades.length === 0) {
            ShowToast("Campo Habilidades Vazio")
            isCorrect = false;
        }
        if(_links.length === 0) {
            ShowToast("Campo Contatos Vazio")
            isCorrect = false;
        }

        if(isCorrect) {
            console.log(_experiencias);
            try{
                fetch('http://localhost:5251/CV', {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: Nome,
                        perfil: Perfil,
                        experiencias:_experiencias,
                        educação:_educacoes,
                        cursos: _cursos,
                        habilidades: _habilidades,
                        contatos: {
                            email: _email,
                            telefone: _telefone,
                            links: _links
                        }
                    })
                })
                .then((response) => response.blob())
                .then((response) => {
                    const blob = new Blob([response], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.download = 'Curriculo.pdf';
                    link.href = URL.createObjectURL(blob);
                    link.click();
                });
                
                
            } catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <main>
            <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    type="error"
                    theme="light"
            />
            
            <form className='md:p-20 bg-zinc-400' action=''>
                <div className='bg-blue-300 p-8 rounded-lg bg-opacity-80'>
                    <label htmlFor='' className="text-center pb-5 md:text-2xl font-semibold leading-relaxed text-gray-800 dark:text-white">Nome</label>
                    <input type='text' name="nome"  className={TextAreaStyle} onChange={ e => { 
                            setNome(e.target.value); 
                            }}/>
                    <br/>
                    <label htmlFor='' className="text-center pb-5 md:text-2xl font-semibold leading-relaxed text-gray-800 dark:text-white">Perfil</label>
                    <textarea type='text' name="perfil" rows="4" className={TextAreaStyle} onChange={ e => { 
                            setPerfil(e.target.value); 
                            }}/>
                    <br/>
                </div>
                <br/>
                <Experiencias UpdateExperiencias={UpdateExperiencias} />
                <br/>
                <Educacoes UpdateEducacoes={UpdateEducacoes}/>
                <br/>
                <Cursos UpdateCursos={UpdateCursos}/>
                <br/>
                <Habilidades UpdateHabilidades={UpdateHabilidades} />
                <br/>
                <Contatos UpdateContato={UpdateContato}/>
                <br/>
                <div className='flex justify-center'>
                    <button type="button" onClick={ValidateAllFields} className="w-1/2 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Finalizar Curriculo                
                    </button>
                </div>
                
            </form>
        </main>
    )
}

export default Curriculo;