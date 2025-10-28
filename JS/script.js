/* --- ONG LAÇOS DO BEM: script.js --- */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MENU & SUBMENU ---
    const menuButton = document.querySelector('.menu-hamburger');
    const menuList = document.querySelector('nav ul'); 
    const dropdownToggle = document.querySelector('.dropdown > a'); 

    if (menuButton && menuList) {
        menuButton.addEventListener('click', function() {
            menuList.classList.toggle('ativo');
        });
    }

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(event) {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                event.preventDefault(); 
                const dropdownLi = dropdownToggle.parentElement;
                dropdownLi.classList.toggle('aberto');
            }
        });
    }

    // --- 2. GRÁFICO ---
    const ctx = document.getElementById('graficoTransparencia');

    if (ctx) {
        const corPrimaria = '#b05d3c';
        const corSecundaria = '#e09f3e';
        const corVerde = '#28a745';

        const dados = {
            labels: [
                'Aquisição de Alimentos',
                'Logística e Embalagens',
                'Custos Administrativos'
            ],
            datasets: [{
                label: 'Distribuição de Recursos (%)',
                data: [85, 10, 5], 
                backgroundColor: [ corPrimaria, corSecundaria, corVerde ],
                hoverOffset: 4
            }]
        };

        new Chart(ctx, {
            type: 'doughnut', 
            data: dados,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }

    // --- 3. MÁSCARAS DE FORMULÁRIO ---
    function aplicarMascara(event) {
        let input = event.target;
        let valor = input.value.replace(/\D/g, ''); 
        let mascara = input.getAttribute('data-mascara');
        let valorFormatado = '';
        let k = 0;

        if (!mascara) return; 

        for (let i = 0; i < mascara.length; i++) {
            if (k >= valor.length) break; 
            if (mascara[i] === '#') {
                valorFormatado += valor[k];
                k++;
            } else {
                valorFormatado += mascara[i];
            }
        }
        input.value = valorFormatado;
    }
    
    function mascaraTelefoneHandler(e) {
         let valor = e.target.value.replace(/\D/g, '');
         if (valor.length <= 10) {
             e.target.setAttribute('data-mascara', '(##) ####-####');
         } else {
             e.target.setAttribute('data-mascara', '(##) #####-####');
         }
         aplicarMascara(e);
    }

    const inputTelefoneVol = document.getElementById('vol-tel');
    const inputTelefoneDoador = document.getElementById('doador-tel');
    const inputCpfVol = document.getElementById('vol-cpf');

    if (inputTelefoneVol) {
        inputTelefoneVol.setAttribute('maxlength', '15');
        inputTelefoneVol.setAttribute('data-mascara', '(##) #####-####');
        inputTelefoneVol.addEventListener('input', mascaraTelefoneHandler);
    }
     if (inputTelefoneDoador) {
        inputTelefoneDoador.setAttribute('maxlength', '15'); 
        inputTelefoneDoador.setAttribute('data-mascara', '(##) #####-####');
        inputTelefoneDoador.addEventListener('input', mascaraTelefoneHandler);
    }

    if (inputCpfVol) {
        inputCpfVol.setAttribute('maxlength', '14'); 
        inputCpfVol.setAttribute('data-mascara', '###.###.###-##');
        inputCpfVol.addEventListener('input', aplicarMascara);
    }

    // --- 4. LOCAL STORAGE (Newsletter) ---
    const formNewsletter = document.querySelector('#newsletter form');
    const inputEmailNewsletter = document.getElementById('email-news');

    if (formNewsletter && inputEmailNewsletter) {
        formNewsletter.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão

            const email = inputEmailNewsletter.value;

            if (email) {
                // Salva no Local Storage
                localStorage.setItem('newsletterEmail', email); 
                
                // Exibe confirmação (simples)
                alert('Obrigado por se inscrever! Seu e-mail ' + email + ' foi registrado.'); 
                
                // Limpa o campo (opcional)
                inputEmailNewsletter.value = ''; 
            } else {
                alert('Por favor, digite um e-mail válido.');
            }
        });

        // Opcional: Recuperar e mostrar o e-mail salvo ao carregar a página
        const emailSalvo = localStorage.getItem('newsletterEmail');
        if(emailSalvo) {
            console.log('E-mail já cadastrado na newsletter:', emailSalvo);
            // Pré-preencher o campo ou mostrar uma mensagem
            // inputEmailNewsletter.value = emailSalvo; 
        }
    }

}); // Fim do 'DOMContentLoaded'