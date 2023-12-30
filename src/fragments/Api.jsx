import React, { useEffect } from 'react';
import '../css/joanstyle.css';
import Prism from 'prismjs';

const Api = () => {
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
          .then((response) => response.json())
          .then((json) => console.log(json));
      }, []);
      var result = document.getElementById('result')

      const handleRunScript = () => {
        // Check if the result and runMessage elements exist before manipulating them
        const resultElement = document.getElementById('result');
        const runMessageElement = document.getElementById('run-message');
    
        if (resultElement && runMessageElement) {
          //var root = location.protocol + '//jsonplaceholder.typicode.com';
          
          fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => {
              var str = JSON.stringify(json, null, '  ');
    
              // Format result
              resultElement.innerHTML = Prism.highlight(
                str,
                Prism.languages.javascript,
                'javascript'
              );
    
              // Show run message
              runMessageElement.className = '';
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
              // You can handle errors or update UI accordingly
            });
        } else {
          console.error("Either 'result' or 'run-message' element is not found in the DOM.");
        }
      };
      
    return (
        <div>
            <div className='container mx-auto max-w-4xl mb-four'>
                <h2 className="text-2xl mb-one">Prueba Nuestra API</h2>
                <p>Ejecuta este código aquí, en una consola o desde cualquier sitio:</p>
                <pre className="language-javascript">
                    <code id="example" className="language-javascript">
                        <span className="token function">fetch</span>
                        <span className="token punctuation">('https://jsonplaceholder.typicode.com/todos/1')</span>
                        <span className="token punctuation">.</span>
                        <span className="token function">then</span>
                        <span className="token punctuation">(</span>
                        <span className="token parameter">response</span> <span className="token operator"></span> response
                        <span className="token punctuation">.</span>
                        <span className="token function">json</span>
                        <span className="token punctuation">()</span>
                        <span className="token punctuation">)</span>
                        <span className="token punctuation">.</span>
                        <span className="token function">then</span>
                        <span className="token punctuation">(</span>
                        <span className="token parameter">json</span> <span className="token operator"></span> console
                        <span className="token punctuation">.</span>
                        <span className="token function">log</span>
                        <span className="token punctuation">(</span>json<span className="token punctuation">)</span>
                        <span className="token punctuation">)</span>
                    </code>
                </pre>
                <button
                    id="run-button"
                    className="
          bg-green-500
          hover:bg-green-700
          text-white
          font-bold
          py-quarter
          my-quarter
          px-4
          rounded
        "
                    onClick={handleRunScript}
                >
                    Run script
                </button>
                <pre className="language-javascript">
                    <code id="result" className="language-javascript">
                        {'{}'}
                    </code>
                </pre>
                <p id="run-message" className="invisible">
                    Felicitaciones has hecho tu primera llamada a SolarUV API!!! 😃 🎉
                </p>
                
            </div>
        </div>
    );
};


export default Api;