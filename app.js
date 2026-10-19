'use strict';
const $=id=>document.getElementById(id);
const KEY='per-practice-v1';
// Fechas de convocatoria: día exacto cuando consta en la portada;
// en los demás casos, mes y año del código del examen original.
const examDates = {
  "1125PEE-1": "2025-11-08",
  "1125PEE-2": "2025-11-08",
  "PEE-0621-1RT": "2021-06",
  "PEE-0621-2NT": "2021-06",
  "PEE-0621-3RT": "2021-06",
  "PEE-0721-1RT": "2021-07",
  "PEE-0721-2NT": "2021-07",
  "PEE-0721-3RT": "2021-07",
  "PEE-1-0324": "2024-03-16",
  "PEE-1-0524": "2024-05-18",
  "PEE-1-0924": "2024-09-28",
  "PEE-1222": "2022-12",
  "PEE-2-0324": "2024-03-16",
  "PEE-2-0524": "2024-05-18",
  "PEE-2-0924": "2024-09-28",
  "PER mayo 2026": "2026-05-23",
  "PER mayo 2026 2": "2026-05-23",
  "PER-0220": "2020-02",
  "PER-0221-1r": "2021-02",
  "PER-0221-2n": "2021-02",
  "PER-0221-3r": "2021-02",
  "PER-0222-1RT": "2022-02",
  "PER-0222-2RT": "2022-02",
  "PER-0223-1": "2023-02",
  "PER-0223-2": "2023-02",
  "PER-0321-1r": "2021-03",
  "PER-0321-2n": "2021-03",
  "PER-0321-3r": "2021-03",
  "PER-0421-1R": "2021-04",
  "PER-0421-2N": "2021-04",
  "PER-0421-3R": "2021-04",
  "PER-0422-1": "2022-04",
  "PER-0521-1RT": "2021-05",
  "PER-0521-2NT": "2021-05",
  "PER-0521-3RT": "2021-05",
  "PER-0720": "2020-07",
  "PER-0722-1": "2022-07-16",
  "PER-0722-2": "2022-07-16",
  "PER-0920-1": "2020-09",
  "PER-0920-3": "2020-09",
  "PER-0922-1": "2022-09-17",
  "PER-0922-2": "2022-09-17",
  "PER-1-0522": "2022-05-21",
  "PER-1-0622": "2022-06-18",
  "PER-1-1022": "2022-10-22",
  "PER-1122-1": "2022-11-19",
  "PER-1122-2": "2022-11-19",
  "PER-1220-1r": "2020-12",
  "PER-1220-2n": "2020-12",
  "PER-1220-3r": "2020-12",
  "PER-1220-4t": "2020-12",
  "PER-1220-5e": "2020-12",
  "PER-1221-1R": "2021-12",
  "PER-1221-2n": "2021-12",
  "PER-1R-1021": "2021-10",
  "PER-1R-1121": "2021-11",
  "PER-1RT-0921": "2021-09",
  "PER-2-0422": "2022-04",
  "PER-2-0522": "2022-05-21",
  "PER-2-0622": "2022-06-18",
  "PER-2-1022": "2022-10-22",
  "PER-2N-1021": "2021-10",
  "PER-2N-1121": "2021-11",
  "PER-2NT-0921": "2021-09",
  "PER-ABR23-1": "2023-04",
  "PER-ABR23-2": "2023-04",
  "PER-JUL23-1": "2023-07",
  "PER-JUL23_2": "2023-07",
  "PER-JUN23-2": "2023-06",
  "PER-JUN23_1": "2023-06",
  "PER-MAR23_01": "2023-03",
  "PER-MAR23_02": "2023-03",
  "PER-MAY23-2": "2023-05",
  "PER-MAY23_1": "2023-05",
  "PER0225T1": "2025-02-15",
  "PER0225T2": "2025-02-15",
  "PER0226T1": "2026-02-14",
  "PER0226T2pdf": "2026-02-14",
  "PER0322-1": "2022-03",
  "PER0322-2": "2022-03",
  "PER0325-1": "2025-03-15",
  "PER0325-2": "2025-03-15",
  "PER0425T1": "2025-04-26",
  "PER0425T2": "2025-04-26",
  "PER0426T1": "2026-04-25",
  "PER0426T2": "2026-04-25",
  "PER0525T1": "2025-05-24",
  "PER0525T2": "2025-05-24",
  "PER0625T1": "2025-06-21",
  "PER0625T2": "2025-06-21",
  "PER1224-1T": "2024-12",
  "PER1224-2T": "2024-12-14",
  "PER1225T1": "2025-12-13",
  "PER1225T2": "2025-12-13",
  "T0925-PEE-1pdf": "2025-09-27",
  "T0925-PEE-2": "2025-09-27"
};
const examMonths = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
function examDateLabel(source) {
  const date = examDates[source];
  if (!date) return 'Fecha del examen no disponible';
  const [year, month, day] = date.split('-').map(Number);
  return `Examen: ${day ? day + ' de ' : ''}${examMonths[month - 1]} de ${year}`;
}

let bank=[],explanations={},session=[],index=0,chosen=null,checked=false,sessionCorrect=0,sessionWrong=0;
const groups=new Map();
const blank=()=>({answered:0,correct:0,incorrect:0,wrongIds:[]});
let progress=readProgress();
function readProgress(){try{const p=JSON.parse(localStorage.getItem(KEY));if(p&&Array.isArray(p.wrongIds))return {...blank(),...p}}catch{}return blank()}
function save(){localStorage.setItem(KEY,JSON.stringify(progress));showSaved()}
function showSaved(){$('saved').textContent=`${progress.answered} respondidas · ${progress.correct} correctas`}
function screen(name){for(const id of ['start','practice','finish'])$(id).classList.toggle('hidden',id!==name)}
function selectedQuestions(mode=$('mode').value){const group=groups.get($('topic').value);const ids=group?.ids;return bank.filter(q=>(!ids||ids.has(q.id))&&(mode!=='incorrect'||progress.wrongIds.includes(q.id)))}
function available(){const n=selectedQuestions().length;$('available').textContent=`${n} ${n===1?'pregunta disponible':'preguntas disponibles'}`;$('begin').disabled=!n;return n}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function start(mode=$('mode').value){session=selectedQuestions(mode);if(mode==='random')shuffle(session);if(!session.length){$('start-message').textContent='No hay preguntas disponibles en esta selección.';screen('start');return}index=0;sessionCorrect=0;sessionWrong=0;screen('practice');render()}
function render(){const q=session[index];chosen=null;checked=false;$('position').textContent=`Pregunta ${index+1} de ${session.length}`;$('score').textContent=`${sessionCorrect} correctas · ${sessionWrong} incorrectas`;$('bar-fill').style.width=`${100*(index+1)/session.length}%`;const group=groups.get($('topic').value);$('question-topic').textContent=`${group?group.name:q.topic} · ${q.source} · ${examDateLabel(q.source)} · pregunta ${q.number}`;$('question-text').textContent=q.question;const fig=$('question-figure');fig.replaceChildren();if(q.topic==='Carta de navegación'&&!q.figure){const note=document.createElement('p');note.className='muted';note.textContent='Algunos ejercicios de esta sección necesitan una carta náutica externa. El PDF de preguntas no la incluye.';fig.append(note)}if(q.figure){const details=document.createElement('details');details.className='source-figure';const summary=document.createElement('summary');summary.textContent='Ver figura o recorte original del PDF';const img=document.createElement('img');img.src='./'+q.figure;img.alt='Fragmento original de la pregunta';img.loading='lazy';const notice=document.createElement('p');notice.className='message hidden';notice.textContent=`No se pudo cargar la figura de la pregunta ${q.id}. Comprobá que ${q.figure} esté subido al repositorio.`;img.addEventListener('error',()=>{img.hidden=true;notice.classList.remove('hidden')});details.append(summary,img,notice);details.open=/dibuix|dibujo|figura|imatge|imagen|esquema|representad|mostra|muestra|gràfic|gráfico/i.test(q.question);fig.append(details)}const choices=$('choices');choices.replaceChildren();for(const [letter,value] of Object.entries(q.choices)){const label=document.createElement('label');label.className='choice';label.dataset.letter=letter;const input=document.createElement('input');input.type='radio';input.name='answer';input.value=letter;input.addEventListener('change',()=>{if(checked)return;chosen=letter;$('check').disabled=false;choices.querySelectorAll('.choice').forEach(x=>x.classList.toggle('checked',x.dataset.letter===letter))});const span=document.createElement('span');span.textContent=`${letter.toUpperCase()}) ${value}`;label.append(input,span);choices.append(label)}$('check').disabled=true;$('check').classList.remove('hidden');$('next').classList.add('hidden');$('next').textContent=index+1===session.length?'Ver resultados':'Siguiente pregunta';$('feedback').className='feedback hidden';$('feedback').textContent='';$('explanation').classList.add('hidden');$('explanation-text').textContent='';$('explanation-contrast').classList.add('hidden');$('explanation-contrast').textContent='';window.scrollTo({top:0,behavior:'instant'})}
function check(){if(checked||!chosen)return;checked=true;const q=session[index],correct=chosen===q.correct;progress.answered++;if(correct){progress.correct++;sessionCorrect++;progress.wrongIds=progress.wrongIds.filter(id=>id!==q.id)}else{progress.incorrect++;sessionWrong++;if(!progress.wrongIds.includes(q.id))progress.wrongIds.push(q.id)}save();const inputs=$('choices').querySelectorAll('input');inputs.forEach(input=>{input.disabled=true;const label=input.closest('.choice');label.classList.add('disabled');if(input.value===q.correct)label.classList.add('correct');if(input.value===chosen&&!correct)label.classList.add('wrong')});const feedback=$('feedback');feedback.className='feedback '+(correct?'good':'bad');feedback.textContent=correct?'Correcto':`Incorrecto. La respuesta correcta es ${q.correct.toUpperCase()}) ${q.choices[q.correct]}`;$('score').textContent=`${sessionCorrect} correctas · ${sessionWrong} incorrectas`;const explanation=explanations[q.id];if(['RIPA','Maniobra','Emergencias en la mar'].includes(q.topic)){const text=$('explanation-text');text.textContent=explanation?.reason||'Esta pregunta todavía no tiene una explicación revisada.';const contrast=$('explanation-contrast');const detail=!correct&&explanation?.wrong?.[chosen];if(detail||explanation?.contrast){contrast.textContent=detail?`Por qué no: ${detail}`:explanation.contrast;contrast.classList.remove('hidden')}$('explanation').classList.remove('hidden')}$('check').classList.add('hidden');$('next').classList.remove('hidden');$('next').focus()}
function next(){if(!checked)return;if(++index<session.length)render();else finish()}
function finish(){screen('finish');const total=sessionCorrect+sessionWrong;const items=[['Respondidas',total],['Correctas',sessionCorrect],['Incorrectas',sessionWrong],['Porcentaje',`${total?Math.round(100*sessionCorrect/total):0}%`]];$('summary').replaceChildren(...items.map(([label,value])=>{const node=document.createElement('div');node.className='stat';const strong=document.createElement('strong');strong.textContent=value;const small=document.createElement('span');small.textContent=label;node.append(strong,small);return node}));$('retry').disabled=!progress.wrongIds.length}
$('mode').addEventListener('change',available);$('topic').addEventListener('change',available);$('begin').addEventListener('click',()=>start());$('check').addEventListener('click',check);$('next').addEventListener('click',next);$('exit').addEventListener('click',()=>{screen('start');available()});$('retry').addEventListener('click',()=>{$('topic').value='all';$('mode').value='incorrect';start('incorrect')});$('again').addEventListener('click',()=>{screen('start');available()});$('reset').addEventListener('click',()=>{if(!window.confirm('¿Borrar todas tus respuestas guardadas?'))return;progress=blank();save();available();$('start-message').textContent='Progreso borrado.'});
showSaved();Promise.all([fetch('./questions.json').then(r=>{if(!r.ok)throw Error('No se pudo abrir questions.json');return r.json()}),fetch('./explanations.json').then(r=>r.ok?r.json():{}).catch(()=>({}))]).then(([data,notes])=>{explanations=notes;if(!Array.isArray(data)||!data.length)throw Error('El banco de preguntas está vacío');bank=data;const topics=[...new Set(bank.map(q=>q.topic).filter(Boolean))];for(const [topicIndex,topic] of topics.entries()){const section=document.createElement('optgroup');section.label=topic;const questions=bank.filter(q=>q.topic===topic);const size=topic==='Carta de navegación'?10:50;for(let i=0;i<questions.length;i+=size){const chunk=questions.slice(i,i+size);const key=`group-${topicIndex}-${Math.floor(i/size)}`;const name=`${topic} ${Math.floor(i/size)+1}`;groups.set(key,{name,ids:new Set(chunk.map(q=>q.id))});const option=document.createElement('option');option.value=key;option.textContent=`${name} (${chunk.length} preguntas)`;section.append(option)}$('topic').append(section)}$('intro').textContent=`${bank.length} preguntas verificadas, divididas en grupos de hasta 50 por tema y de 10 en Carta de navegación. Elegí cómo querés practicar.`;available()}).catch(e=>{$('intro').textContent='No se pudieron cargar las preguntas. Abrí esta página mediante un servidor local o GitHub Pages.';$('start-message').textContent=e.message});
