const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
$("#year").textContent = new Date().getFullYear();

const menuToggle=$("#menuToggle"), mainNav=$("#mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
$$(".main-nav a").forEach(a=>a.addEventListener("click",()=>mainNav.classList.remove("open")));

const searchPanel=$("#searchPanel");
$("#searchToggle").addEventListener("click",()=>{searchPanel.classList.toggle("open");if(searchPanel.classList.contains("open"))$("#siteSearch").focus();});
$("#searchClose").addEventListener("click",()=>searchPanel.classList.remove("open"));
const searchable=[...$$("main h2, main h3")].map(el=>({title:el.textContent.trim(),section:el.closest("section")?.id||"home"}));
function runSearch(){const q=$("#siteSearch").value.trim().toLowerCase();const matches=searchable.filter(x=>x.title.toLowerCase().includes(q));$("#searchResults").innerHTML=!q?"Type a topic to search this page.":matches.length?matches.map(x=>`<a class="search-result" href="#${x.section}">${x.title} →</a>`).join("  "):"No matching headings found. Try another keyword.";}
$("#searchGo").addEventListener("click",runSearch);$("#siteSearch").addEventListener("keydown",e=>{if(e.key==="Enter")runSearch();});

/* Pharmacy syllabus explorer: D.Pharm ER-2020 + B.Pharm PCI legacy and NEP 2026 */
const dpharmData = [
 {label:"1st Year", subjects:[
  ["ER20-11","Pharmaceutics"],["ER20-12","Pharmaceutical Chemistry"],["ER20-13","Pharmacognosy"],
  ["ER20-14","Human Anatomy & Physiology"],["ER20-15","Social Pharmacy"]
 ]},
 {label:"2nd Year", subjects:[
  ["ER20-21","Pharmacology"],["ER20-22","Community Pharmacy & Management"],
  ["ER20-23","Biochemistry & Clinical Pathology"],["ER20-24","Pharmacotherapeutics"],
  ["ER20-25","Hospital & Clinical Pharmacy"],["ER20-26","Pharmacy Law & Ethics"]
 ]}
];

const bpharmLegacy = [
 {label:"Semester 1",subjects:[
  ["BP101T","Human Anatomy and Physiology I"],["BP102T","Pharmaceutical Analysis I"],
  ["BP103T","Pharmaceutics I"],["BP104T","Pharmaceutical Inorganic Chemistry"],
  ["BP105T","Communication Skills"],["BP106RBT","Remedial Biology / Remedial Mathematics"]
 ]},
 {label:"Semester 2",subjects:[
  ["BP201T","Human Anatomy and Physiology II"],["BP202T","Pharmaceutical Organic Chemistry I"],
  ["BP203T","Biochemistry"],["BP204T","Pathophysiology"],["BP205T","Computer Applications in Pharmacy"],
  ["BP206T","Environmental Sciences"]
 ]},
 {label:"Semester 3",subjects:[
  ["BP301T","Pharmaceutical Organic Chemistry II"],["BP302T","Physical Pharmaceutics I"],
  ["BP303T","Pharmaceutical Microbiology"],["BP304T","Pharmaceutical Engineering"]
 ]},
 {label:"Semester 4",subjects:[
  ["BP401T","Pharmaceutical Organic Chemistry III"],["BP402T","Medicinal Chemistry I"],
  ["BP403T","Physical Pharmaceutics II"],["BP404T","Pharmacology I"],
  ["BP405T","Pharmacognosy and Phytochemistry I"]
 ]},
 {label:"Semester 5",subjects:[
  ["BP501T","Medicinal Chemistry II"],["BP502T","Industrial Pharmacy I"],
  ["BP503T","Pharmacology II"],["BP504T","Pharmacognosy and Phytochemistry II"],
  ["BP505T","Pharmaceutical Jurisprudence"]
 ]},
 {label:"Semester 6",subjects:[
  ["BP601T","Medicinal Chemistry III"],["BP602T","Pharmacology III"],
  ["BP603T","Herbal Drug Technology"],["BP604T","Biopharmaceutics and Pharmacokinetics"],
  ["BP605T","Pharmaceutical Biotechnology"],["BP606T","Quality Assurance"]
 ]},
 {label:"Semester 7",subjects:[
  ["BP701T","Instrumental Methods of Analysis"],["BP702T","Industrial Pharmacy II"],
  ["BP703T","Pharmacy Practice"],["BP704T","Novel Drug Delivery Systems"]
 ]},
 {label:"Semester 8",subjects:[
  ["BP801T","Biostatistics and Research Methodology"],["BP802T","Social and Preventive Pharmacy"],
  ["BP803T","Pharma Marketing Management"],["BP804T","Pharmaceutical Regulatory Science"],
  ["BP805T","Pharmacovigilance"],["BP806T","Quality Control and Standardization of Herbals"],
  ["BP807T","Computer Aided Drug Design"]
 ]}
];

/* Course titles and codes below follow the PCI B.Pharm 2026 NEP syllabus tables.
   Elective groups are shown as choices, not as compulsory simultaneous subjects. */
const bpharmNep2026 = [
 {label:"Semester 1",subjects:[
  ["BP101T","Basics of Python Programming for Pharmaceutical Sciences"],
  ["BP102T","General Pharmacy"],["BP103T","Healthcare Psychology and Communication Skills"],
  ["BP104T","Human Anatomy, Physiology and Pathophysiology I"],
  ["BP105T","Introduction to Pharmacognosy"],["BP106T","Pharmaceutical Inorganic and Analytical Chemistry"],
  ["BP107P","General Pharmacy Practical"],["BP108P","Healthcare Psychology and Communication Skills Practical"],
  ["BP109P","Human Anatomy, Physiology and Pathophysiology I Practical"],
  ["BP110P","Introduction to Pharmacognosy Practical"],["BP111P","Pharmaceutical Inorganic and Analytical Chemistry Practical"]
 ]},
 {label:"Semester 2",subjects:[
  ["BP201T","Applied Biostatistics and Data Analytics for Pharmaceutical Sciences"],
  ["BP202T","Biochemistry"],["BP203T","Human Anatomy, Physiology and Pathophysiology II"],
  ["BP204T","Pharmaceutical Organic Chemistry"],["BP205T","Pharmacognosy and Phytochemistry"],
  ["BP206T","Physical Pharmaceutics"],["BP207P","Biochemistry Practical"],
  ["BP208P","Human Anatomy, Physiology and Pathophysiology II Practical"],
  ["BP209P","Pharmaceutical Organic Chemistry Practical"],
  ["BP210P","Pharmacognosy and Phytochemistry Practical"],["BP211P","Physical Pharmaceutics Practical"],
  ["BP212P SEC","SEC choice: Communication Skills / Mental Well-Being, Stress & Conflict Management / Fundamentals of Computer Operations"]
 ]},
 {label:"Semester 3",subjects:[
  ["BP301T","Introduction to Machine Learning in Pharmaceutical Sciences"],["BP302T","Environmental Sciences"],
  ["BP303T","Ethics and Universal Human Values"],["BP304T","General Pharmacology"],
  ["BP305T","Heterocyclic Compounds and Stereochemistry"],["BP306T","Pharmaceutical Dosage Forms I"],
  ["BP307T","Pharmaceutical Engineering"],["BP308T","Pharmaceutical Microbiology"],
  ["BP309P","General Pharmacology Practical"],["BP310P","Heterocyclic Compounds and Stereochemistry Practical"],
  ["BP311P","Pharmaceutical Dosage Forms I Practical"],
  ["BP312P AEC","AEC choice: Nutraceuticals and Functional Foods / Food Analysis / Yoga and Life Sciences"]
 ]},
 {label:"Semester 4",subjects:[
  ["BP401T","Herbal Drug Technology"],["BP402T","Medicinal Chemistry"],["BP403T","Pharmaceutical Biotechnology"],
  ["BP404T","Social Pharmacy and Public Health"],["BP405T","Systemic Pharmacology I"],
  ["BP406P","Herbal Drug Technology Practical"],["BP407P","Medicinal Chemistry Practical"],
  ["BP408P","Pharmaceutical Biotechnology Practical"],["BP409P","Social Pharmacy and Public Health Practical"],
  ["BP410P","Systemic Pharmacology I Practical"],["BP411I","Mandatory Internship"]
 ]},
 {label:"Semester 5",subjects:[
  ["BP501T","Biomedical Chemistry"],["BP502T","Industrial Pharmacognosy"],
  ["BP503T","Innovation and Startup Ecosystem"],["BP504T","Pharmaceutical Dosage Form II"],
  ["BP505T","Pharmaceutical Quality Assurance"],["BP506T","Systemic Pharmacology II"],
  ["BP507P","Biomedical Chemistry Practical"],["BP508P","Industrial Pharmacognosy Practical"],
  ["BP509P","Pharmaceutical Dosage Form II Practical"],["BP510P","Systemic Pharmacology II Practical"]
 ]},
 {label:"Semester 6",subjects:[
  ["BP601T","Advanced Pharmacognosy"],["BP602T","Biopharmaceutics and Pharmacokinetics"],
  ["BP603T","Intellectual Property Rights"],["BP604T","AI Applications in Pharmaceutical Sciences"],
  ["BP605T","Pharmaceutical Analysis"],["BP606T","Pharmaceutical Jurisprudence"],
  ["BP607T AEC","AEC choice: Green Chemistry / Materiovigilance and Hemovigilance / Scientific Writing / Drug Store and Business Management / Career Building in Cultivation of Medicinal Plants / Active Pharmaceutical Ingredients and Excipient Sciences"],
  ["BP608P","Biopharmaceutics and Pharmacokinetics Practical"],["BP609P","Pharmaceutical Analysis Practical"],
  ["BP610P SEC","SEC choice: Computer-Aided Drug Design / Analytical Method Development and Validation / Principles of Preclinical Studies"],
  ["BP611P VAC","VAC choice: Professional Skills / Process Analytical Technology (PAT) and QbD in Formulation Science"],
  ["BP612I","Mandatory Internship"]
 ]},
 {label:"Semester 7",subjects:[
  ["BP701T","Biostatistics Research Methodology"],["BP702T","Cosmetics and Cosmeceuticals"],
  ["BP703T","AI in Clinical Applications"],["BP704T","Modern Analytical Techniques"],
  ["BP705T","Pharmacovigilance"],["BP706T","Pharmacy Practice"],["BP707T","Regulatory Affairs"],
  ["BP708T AEC","AEC choice: Current Good Manufacturing Practices (cGMP) / Pharmaceutical Automation / Modern Techniques in Cellular Biology / Medical Devices / Transformation of Food Waste into Medicinal Products / Biosimilars, Vaccines & Macromolecules"],
  ["BP709P","Modern Analytical Techniques Practical"],["BP710RP","Research Project"]
 ]},
 {label:"Semester 8",subjects:[
  ["BP801T","Ethical Considerations and Translational Applications of AI in Pharmacy"],
  ["BP802T","Clinical Pharmacotherapeutics"],["BP803T","Industrial Pharmacy and Facility Design"],
  ["BP804T","Pharmaceutical Management"],["BP805T","Sterile Dosage Forms and Novel Drug Delivery System"],
  ["BP806T AEC","Elective choice: Pharmaceutical Packaging / Supply Chain Management / Industrial Safety and Waste Management / Traditional Healing Practices of India / Futuristic Pharma through AR/VR: Pharma 4.0 / Herbal Cosmetics for Industry Perspective"],
  ["BP807P","Pharmaceutical Marketing Skills Practical"],
  ["BP808P","Sterile Dosage Forms and Novel Drug Delivery System Practical"],
  ["BP809P VAC","VAC choice: Cleaning Validation / Basic Training in Aseptic Handling Techniques / Impurity Profiling"],
  ["BP810RP","Research Project"]
 ]}
];

let activeProgramme = "dpharm";
let activeBpharmVersion = "legacy";
let selectedSubject = null;

function getActiveSyllabus(){
 if(activeProgramme==="dpharm") return dpharmData;
 return activeBpharmVersion==="nep2026" ? bpharmNep2026 : bpharmLegacy;
}
function renderProgramme(){
 const host=$("#programmeContent");
 const groups=getActiveSyllabus();
 host.innerHTML=groups.map((group,i)=>`
  <details class="year-accordion" ${i===0?"open":""}>
   <summary><span>${group.label}</span><small>${group.subjects.length} courses</small></summary>
   <div class="syllabus-subjects">${group.subjects.map(([code,name],j)=>`
    <button class="syllabus-subject" type="button" data-subject-index="${i}-${j}">
     <span class="subject-index">${code}</span><span>${name}</span><span class="subject-arrow">↗</span>
    </button>`).join("")}</div>
  </details>`).join("");
 $$(".syllabus-subject",host).forEach(btn=>btn.addEventListener("click",()=>{
  const [gi,si]=btn.dataset.subjectIndex.split("-").map(Number);
  const group=groups[gi], [code,name]=group.subjects[si];
  openSubject({programme:activeProgramme,group:group.label,code,name,version:activeProgramme==="bpharm"?(activeBpharmVersion==="legacy"?"PCI 2016–17":"PCI NEP 2026–27"):"D.Pharm ER-2020"});
 }));
}
function openSubject(subject){
 selectedSubject=subject;
 $("#subjectDialogTitle").textContent=subject.name;
 $("#subjectDialogMeta").textContent=`${subject.code} · ${subject.group} · ${subject.version}`;
 $$(".resource-tab").forEach(b=>b.classList.toggle("active",b.dataset.resource==="overview"));
 renderSubjectResource("overview");
 $("#subjectDialog").classList.add("open");
 $("#subjectDialog").setAttribute("aria-hidden","false");
 document.body.classList.add("dialog-open");
}
function renderSubjectResource(kind){
 const name=selectedSubject?.name||"this subject";
 const map={
  overview:`<h4>About this subject</h4><p>Structured learning material for <strong>${name}</strong> will be organized here.</p><ul><li>Course overview and learning outcomes</li><li>Verified syllabus and course code</li><li>Unit-wise notes in clear, exam-friendly language</li></ul>`,
  units:`<h4>Unit-wise learning</h4><div class="resource-placeholder"><strong>Unit 1 · Unit 2 · Unit 3 · Unit 4 · Unit 5</strong><p>Unit titles and detailed notes will be added from the applicable official syllabus.</p></div>`,
  questions:`<h4>Important questions</h4><div class="resource-placeholder"><p>2-mark, 5-mark and 10-mark questions, previous-year questions and practice questions will be added after syllabus mapping.</p></div>`,
  practical:`<h4>Practical resources</h4><div class="resource-placeholder"><p>Practical syllabus, experiments, records, viva questions and lab calculations will be added where applicable to this course.</p></div>`
 };
 $("#subjectResourceContent").innerHTML=map[kind]||map.overview;
}
$$(".programme-tab").forEach(btn=>btn.addEventListener("click",()=>{
 activeProgramme=btn.dataset.programme;
 $$(".programme-tab").forEach(b=>b.classList.toggle("active",b===btn));
 $("#bpharmVersion").hidden=activeProgramme!=="bpharm";
 renderProgramme();
}));
$$(".version-tab").forEach(btn=>btn.addEventListener("click",()=>{
 activeBpharmVersion=btn.dataset.version;
 $$(".version-tab").forEach(b=>b.classList.toggle("active",b===btn));
 $("#versionHelp").textContent=activeBpharmVersion==="legacy"
  ?"For batches following the PCI 2016–17 scheme. Confirm the applicable scheme with your university."
  :"PCI's revised B.Pharm syllabus as per NEP 2020, scheduled for implementation from academic session 2026–27.";
 renderProgramme();
}));
$$(".resource-tab").forEach(btn=>btn.addEventListener("click",()=>{
 $$(".resource-tab").forEach(b=>b.classList.toggle("active",b===btn));
 renderSubjectResource(btn.dataset.resource);
}));
$$("[data-close-subject]").forEach(el=>el.addEventListener("click",closeSubject));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSubject();});
function closeSubject(){
 const dlg=$("#subjectDialog");
 if(!dlg) return;
 dlg.classList.remove("open");dlg.setAttribute("aria-hidden","true");
 document.body.classList.remove("dialog-open");
}
renderProgramme();

const modal=$("#toolModal"), modalTitle=$("#modalTitle"), modalBody=$("#modalBody");
function field(id,label,placeholder,type="number",step="any"){return `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}" step="${step}" placeholder="${placeholder}"></div>`;}
function resultBox(){return `<div class="result-box" id="calcResult" aria-live="polite">Enter values and calculate.</div>`;}
function openTool(type){
 let title="",body="";
 if(type==="bmi"){
  title="BMI Calculator";
  body=`<div class="form-row">${field("weight","Weight (kg)","e.g. 65")}
   <div class="field"><label for="heightUnit">Height unit</label><select id="heightUnit"><option value="cm">Centimetres (cm)</option><option value="ft">Feet and inches</option></select></div></div>
   <div id="heightCmField">${field("heightCm","Height (cm)","e.g. 170")}</div>
   <div id="heightFtFields" class="form-row" style="display:none">${field("heightFt","Feet","e.g. 5")}${field("heightIn","Inches","e.g. 7")}</div>
   <button class="calc-button" id="calculate">Calculate BMI</button>
   <div id="bmiVisual" class="bmi-visual" style="display:none">
    <div class="bmi-value" id="bmiValue">—</div><div class="bmi-category" id="bmiCategory"></div>
    <div class="bmi-scale"><span class="bmi-marker" id="bmiMarker"></span></div>
    <div class="bmi-scale-labels"><span>Underweight</span><span>Healthy range</span><span>Overweight</span><span>Obesity</span></div>
   </div>
   <div id="bmiSuggestions" class="result-box" style="display:none"></div>
   <p class="modal-disclaimer">Adult BMI categories are screening guidance, not a diagnosis. BMI interpretation differs for children, pregnancy, older adults and some athletic or clinical groups.</p>`;
 }
 if(type==="convert"){
  title="Unit Converter";
  body=`<div class="converter-tabs">${["Length","Temperature","Area","Volume","Weight","Time","Pharma mass","Pharma volume"].map((x,i)=>`<button class="converter-tab ${i===0?"active":""}" data-category="${x.toLowerCase()}">${x}</button>`).join("")}</div>
   <div class="converter-panel">
    <div class="converter-columns">
     <div class="field"><label for="fromValue">From</label><input id="fromValue" type="number" step="any" placeholder="Enter value"><select id="fromUnit" size="7"></select></div>
     <div class="field"><label for="toValue">To</label><input id="toValue" type="text" readonly placeholder="Converted result"><select id="toUnit" size="7"></select></div>
    </div>
    <div class="converter-actions"><button class="calc-button" id="swapUnits" type="button">⇄ Swap units</button><button class="calc-button secondary-calc" id="clearConvert" type="button">Clear</button></div>
   </div><p class="modal-disclaimer">Choose a category, enter a value and select the source and target units. Temperature conversions use their correct offset formulas.</p>`;
 }
 if(type==="mgkg"){
  title="Dose Calculator Practice";
  body=`<div class="practice-top"><div class="difficulty-tabs"><button class="difficulty-tab active" data-level="easy">Easy</button><button class="difficulty-tab" data-level="standard">Standard</button><button class="difficulty-tab" data-level="hard">Hard</button></div><span class="learning-tag">Learning practice only</span></div>
   <div class="practice-question"><div class="practice-label">Weight-based dose arithmetic <span id="difficultyLabel">Easy</span></div><p id="questionText"></p><div class="question-chips" id="questionChips"></div>
    <div class="form-row">${field("answerDose","Dose per administration (mg)","Your answer")}${field("answerVolume","Volume per dose (mL)","Your answer")}</div>
   </div>
   <button class="calc-button" id="checkAnswer">Check answer</button>
   <div class="practice-links"><button id="showHint">Hint</button><button id="showSolution">Show solution</button><button id="newProblem">New problem</button></div>
   <div id="practiceFeedback" class="result-box">Choose a difficulty and solve the question.</div>
   <p class="modal-disclaimer">Educational arithmetic only. The displayed order and concentration are fictional practice values, not prescribing guidance. Never use this tool to select or verify a real patient's medicine dose.</p>`;
 }
 if(type==="dilution"){title="Dilution Calculator";body=`<p style="font-size:11px;color:#68798a;line-height:1.6">Formula: C₁ × V₁ = C₂ × V₂. Use consistent concentration units.</p><div class="form-row">${field("c1","Stock concentration (C₁)","e.g. 10")}${field("c2","Target concentration (C₂)","e.g. 2")}</div>${field("v2","Final volume (V₂)","e.g. 100")}<button class="calc-button" id="calculate">Calculate stock volume</button>${resultBox()}`;}
 modalTitle.textContent=title;modalBody.innerHTML=body;modal.classList.add("open");document.body.style.overflow="hidden";
 if(type==="bmi"){
  $("#heightUnit").addEventListener("change",()=>{const ft=$("#heightUnit").value==="ft";$("#heightCmField").style.display=ft?"none":"block";$("#heightFtFields").style.display=ft?"grid":"none";});
 }
 if(type==="convert")setupConverter();
 if(type==="mgkg")setupPractice();
 if($("#calculate"))$("#calculate").addEventListener("click",()=>{
  const n=id=>Number($("#"+id).value), valid=(...ids)=>ids.every(id=>$("#"+id).value.trim()!==""&&Number.isFinite(n(id)));
  let message="";
  if(type==="bmi"){
   let h=0;
   if($("#heightUnit").value==="cm"){if(valid("heightCm"))h=n("heightCm")/100;}
   else if(valid("heightFt","heightIn"))h=(n("heightFt")*12+n("heightIn"))*0.0254;
   if(!valid("weight")||n("weight")<=0||h<=0||h>3){message="Enter a valid positive weight and height.";$("#bmiVisual").style.display="none";$("#bmiSuggestions").style.display="none";}
   else{
    const bmi=n("weight")/(h*h);const cat=bmi<18.5?"Underweight":bmi<25?"Healthy weight":bmi<30?"Overweight":"Obesity range";
    $("#bmiVisual").style.display="block";$("#bmiValue").textContent=bmi.toFixed(1);$("#bmiCategory").textContent=cat;
    $("#bmiMarker").style.left=Math.max(1,Math.min(99,(bmi/40)*100))+"%";
    $("#bmiSuggestions").style.display="block";
    $("#bmiSuggestions").innerHTML=`<strong>Learn more</strong><br><a href="#healthcare" class="suggestion-link">Food, nutrition and healthy eating articles →</a><br><a href="#articles" class="suggestion-link">Browse wellness and weight-management education →</a><br><small>These are general educational resources, not a personalised diet plan.</small>`;
   }
   if(message)$("#calcResult")?.remove();else message="";
  }
  if(type==="dilution"){if(!valid("c1","c2","v2")||n("c1")<=0||n("c2")<0||n("v2")<=0||n("c2")>n("c1"))message="Check values. Target concentration should not exceed stock concentration for a simple dilution.";else message=`Stock volume (V₁): <strong>${(n("c2")*n("v2")/n("c1")).toFixed(3)}</strong> (same volume unit as V₂)<br>Diluent volume: <strong>${(n("v2")-(n("c2")*n("v2")/n("c1"))).toFixed(3)}</strong>`;}
  if(type==="dilution")$("#calcResult").innerHTML=message;
 });
}
$$(".tool-open").forEach(btn=>btn.addEventListener("click",()=>openTool(btn.dataset.tool)));
$("#modalClose").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
function closeModal(){modal.classList.remove("open");document.body.style.overflow="";}

function setupConverter(){
 const units={
  length:{Meter:1,Kilometer:1000,Centimeter:.01,Millimeter:.001,Micrometer:1e-6,Nanometer:1e-9,Mile:1609.344,Yard:.9144,Foot:.3048,Inch:.0254,"Light year":9.4607e15},
  temperature:{Celsius:"c",Fahrenheit:"f",Kelvin:"k"},
  area:{"Square meter":1,"Square kilometer":1e6,"Square centimeter":.0001,"Square foot":.092903,"Square inch":.00064516,"Acre":4046.8564,Hectare:10000},
  volume:{Liter:1,Milliliter:.001,"Cubic meter":1000,"Cubic centimeter":.001,"US gallon":3.785411784,"US fluid ounce":.0295735,"Teaspoon":.00492892,"Tablespoon":.0147868},
  weight:{Kilogram:1,Gram:.001,Milligram:1e-6,Microgram:1e-9,Tonne:1000,Pound:.45359237,Ounce:.0283495},
  time:{Second:1,Millisecond:.001,Minute:60,Hour:3600,Day:86400,Week:604800},
  pharmamass:{Kilogram:1000000000,Gram:1000000,Milligram:1000,Microgram:1,Nanogram:.001},
  pharmavolume:{Liter:1000000,Milliliter:1000,Microliter:1,Nanoliter:.001,"US fluid ounce":29573.5,"Drop (approx.)":50}
 };
 const category="length";let current=category;
 const from=$("#fromUnit"),to=$("#toUnit");
 function fill(cat){current=cat;const names=Object.keys(units[cat]);from.innerHTML=names.map((x,i)=>`<option ${i===0?"selected":""}>${x}</option>`).join("");to.innerHTML=names.map((x,i)=>`<option ${i===Math.min(1,names.length-1)?"selected":""}>${x}</option>`).join("");convert();}
 function convert(){
  const value=$("#fromValue").value;if(value===""){ $("#toValue").value="";return;}
  const a=from.value,b=to.value,x=Number(value);if(!Number.isFinite(x))return;
  let result;
  if(current==="temperature"){
   let c=a==="Celsius"?x:a==="Fahrenheit"?(x-32)*5/9:x-273.15;
   result=b==="Celsius"?c:b==="Fahrenheit"?c*9/5+32:c+273.15;
  }else result=x*units[current][a]/units[current][b];
  $("#toValue").value=Number(result.toPrecision(10)).toLocaleString(undefined,{maximumFractionDigits:10});
 }
 $$(".converter-tab").forEach(btn=>btn.addEventListener("click",()=>{$$(".converter-tab").forEach(b=>b.classList.toggle("active",b===btn));fill(btn.dataset.category);}));
 from.addEventListener("change",convert);to.addEventListener("change",convert);$("#fromValue").addEventListener("input",convert);
 $("#swapUnits").addEventListener("click",()=>{const a=from.value;from.value=to.value;to.value=a;convert();});
 $("#clearConvert").addEventListener("click",()=>{$("#fromValue").value="";$("#toValue").value="";});
 fill(category);
}

function setupPractice(){
 let level="easy",problem=null;
 const configs={easy:{weights:[20,25,30,35,40],dose:[5,10,15,20],interval:[8,12],conc:[20,25,50,100],unit:"kg"},
 standard:{weights:[18,22,28,32,36,40],dose:[10,15,20,25,30],interval:[6,8],conc:[50,100,125],unit:"kg"},
 hard:{weights:[25,30,35,40,45,50,55,60],dose:[25,30,40,50,60,75],interval:[6,8],conc:[50,100,125,200],unit:"lb"}};
 const pick=a=>a[Math.floor(Math.random()*a.length)];
 function newProblem(){
  const c=configs[level],weight=pick(c.weights),daily=pick(c.dose),hours=pick(c.interval),concentration=pick(c.conc);
  const kg=c.unit==="lb"?weight/2.2:weight;const doses=24/hours;
  const total=daily*kg;const perDose=total/doses;const volume=perDose/concentration;
  problem={weight,daily,hours,concentration,unit:c.unit,perDose,volume,doses};
  $("#difficultyLabel").textContent=level[0].toUpperCase()+level.slice(1);
  $("#questionText").textContent=`Order: ${daily} mg/kg/day PO divided every ${hours} hours. Patient weight: ${weight} ${c.unit}. Available: ${concentration} mg per 1 mL. How much will you give per dose?`;
  $("#questionChips").innerHTML=[`Order ${daily} mg/kg/day`, `Weight ${weight} ${c.unit}`,`Available ${concentration} mg/1 mL`].map(x=>`<span>${x}</span>`).join("");
  $("#answerDose").value="";$("#answerVolume").value="";$("#practiceFeedback").textContent="Enter dose per administration and volume per dose.";
 }
 $$(".difficulty-tab").forEach(btn=>btn.addEventListener("click",()=>{$$(".difficulty-tab").forEach(b=>b.classList.toggle("active",b===btn));level=btn.dataset.level;newProblem();}));
 $("#newProblem").addEventListener("click",newProblem);
 $("#showHint").addEventListener("click",()=>$("#practiceFeedback").innerHTML=`Hint: ${problem.unit==="lb"?"Convert pounds to kilograms (lb ÷ 2.2). ":""}Find total mg/day, divide by ${problem.doses} doses per day, then divide mg per dose by ${problem.concentration} mg/mL.`);
 $("#showSolution").addEventListener("click",()=>$("#practiceFeedback").innerHTML=`Solution: ${problem.unit==="lb"?`${problem.weight} ÷ 2.2 = ${(problem.weight/2.2).toFixed(2)} kg. `:`Weight = ${problem.weight} kg. `}${problem.daily} × ${(problem.unit==="lb"?problem.weight/2.2:problem.weight).toFixed(2)} = ${(problem.daily*(problem.unit==="lb"?problem.weight/2.2:problem.weight)).toFixed(2)} mg/day; ÷ ${problem.doses} = ${problem.perDose.toFixed(2)} mg per dose; ÷ ${problem.concentration} mg/mL = ${problem.volume.toFixed(2)} mL per dose.`);
 $("#checkAnswer").addEventListener("click",()=>{
  const d=Number($("#answerDose").value),v=Number($("#answerVolume").value);
  if($("#answerDose").value.trim()===""||$("#answerVolume").value.trim()===""){ $("#practiceFeedback").textContent="Enter both answers first.";return;}
  const ok=Math.abs(d-problem.perDose)<0.06&&Math.abs(v-problem.volume)<0.06;
  $("#practiceFeedback").innerHTML=ok?`<strong>Correct!</strong> Dose: ${problem.perDose.toFixed(2)} mg per administration; volume: ${problem.volume.toFixed(2)} mL.`:`<strong>Not quite.</strong> Check your unit conversion and divide the daily amount by the number of administrations. Use Hint or Show solution.`;
 });
 newProblem();
}
