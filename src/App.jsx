import {useState,useEffect} from "react";

const PDFS=[
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Droit Constitutionnel de la V° République. pages.pdf",display:"CM - Droit Constit V° Rép"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Droit Constitutionnel de la Vème République.pdf",display:"CM - Droit Constit Vème Rép"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Droit constitutionnel de la V° République (1). pages.pdf",display:"CM - Droit Constit (1)"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-ELIES - Droit constit de la 5ème république. pages.pdf",display:"CM - ELIES Droit Constit"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Plan du cours 2026.pdf",display:"CM - Plan 2026"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Ve République.pdf",display:"CM - Ve République"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Cours du 12 mars 2025.pdf",display:"Cours 12 mars 2025"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Fiche 4. Adoption et révision des Constitutions  Cairn.info.pdf",display:"Fiche 4 - Adoption & révision"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Fiche TD .pdf",display:"Fiche TD"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Fiche définitions TD - droit constitutionnel.pdf",display:"Définitions TD"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Fiche exercices TD droit constitutionnel .pdf",display:"Exercices TD"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-La Constitution de la Ve République - comment est-elle née   Conseil constitutionnel.pdf",display:"Constitution - Comment née"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Première Partie.pdf",display:"Première Partie"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Quels ont été les temps forts de l'élaboration de la Constitution  vie-publique.fr.pdf",display:"Temps forts élaboration"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Résumer cours DC moodle.pdf",display:"Résumé DC Moodle"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Résumé cours DC moodle 2 .pdf",display:"Résumé DC Moodle 2"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Séminaire normes 1 .pdf",display:"Séminaire normes 1"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Séminaire normes 2..pdf",display:"Séminaire normes 2"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Texte intégral de la Constitution du 4 octobre 1958 en vigueur  Conseil constitutionnel.pdf",display:"Constitution 1958 intégrale"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Variations sur l'éthique - Réflexions sur la légitimité du référendum constituant - Presses universitaires Saint-Louis Bruxelles.pdf",display:"Éthique référendum"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-articles droit constitutionnel.pdf",display:"Articles DC"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-dates droit constitutionnel.pdf",display:"Dates DC"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-guide le Gistique de 2007.pdf",display:"Guide légistique 2007"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-introduction .pdf",display:"Introduction"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-seconde partie semestre 2.pdf",display:"Seconde partie S2"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-sources de la Ve.pdf",display:"Sources Ve République"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-DISSERTATION .pdf",display:"TD - Dissertation"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-FICHES TD - DC S2.pdf",display:"TD - Fiches S2"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-Fiche définitions TD - droit constitutionnel. pages.pdf",display:"TD - Définitions"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-Plaquette 2024-2025.pdf",display:"TD - Plaquette 2024-25"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.1 - La mise en place des institutions.pdf",display:"TD S1 - Mise en place institutions"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.10 - Le Conseil constitutionnel.pdf",display:"TD S10 - Conseil constitutionnel"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.2 - Les origines intellectuelles, les compromis et les ambiguïtés de la Constitution.pdf",display:"TD S2 - Origines intellectuelles"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.3 - Réforme 1962 - Présidentialisme majoritaire.pdf",display:"TD S3 - Réforme 1962"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.4 - Réforme 1962 - Coahbitation.pdf",display:"TD S4 - Cohabitation"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.5 - Le présidentialisme renouvelé.pdf",display:"TD S5 - Présidentialisme renouvelé"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.7 - La fonction de contrôle du Parlement.pdf",display:"TD S7 - Fonction contrôle"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.8 - La fonction législative.pdf",display:"TD S8 - Fonction législative"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°1 - DROIT CONSTIT .pdf",display:"TD - Séance 1"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°2 - DROIT CONSTIT.pdf",display:"TD - Séance 2"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°3 - DROIT CONSTIT .pdf",display:"TD - Séance 3"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°4 - DROIT CONSTIT.pdf",display:"TD - Séance 4"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°5 - DROIT CONSTIT .pdf",display:"TD - Séance 5"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD - ELIES DC . pages.pdf",display:"TD - ELIES DC"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD DC semestre 2 - 2. pages.pdf",display:"TD - DC S2 (2)"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD DC semestre 2 -. pages.pdf",display:"TD - DC S2"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD N°2 - DC . pages.pdf",display:"TD N°2 DC"},
  {m:"DC",name:"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD N°3 - DC. pages.pdf",display:"TD N°3 DC"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-CM-Droit de la famille . pages.pdf",display:"CM - Droit de la famille"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-1. ( Cour de cassation, civile, Chambre civile 1, 13 mars 2007, 05-16.627, Publié au bulletin - Légifrance ).pdf",display:"Arrêt Cass 13 mars 2007"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-2. Décision 2013-669 DC - 17 mai 2013 - Loi ouvrant le mariage aux couples de personnes de même sexe - Conformité - réserve - Légifrance.pdf",display:"Décision mariage pour tous 2013"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-4. CA Nimes 14 avril 2020.pdf",display:"CA Nîmes 14 avril 2020"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-5. Fidélité et site de relations extra-conjugales- 212 Code civil.pdf",display:"Fidélité art 212"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-6. .pdf",display:"Document 6"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-7. cdcm_v4.pdf",display:"CDCM v4"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-8. H.W. c. FRANCE.pdf",display:"CEDH H.W. c. France"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Comprendre un arret de la Cour de cassation rendu en matiere civile.pdf",display:"Comprendre arrêt Cass"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Cour de cassation - LÉLABORATION DUN ARRÊT DE LA COUR DE CASSATION (1) - Etude par Daniel TRICOT.pdf",display:"Élaboration arrêt - Tricot"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Eléments de méthode rappel.pdf",display:"Éléments méthode"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Extrait de la méthode du Pr beaussonie commentaire.pdf",display:"Méthode Beaussonie"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Lois et décisions - DDF.pdf",display:"Lois et décisions"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Méthode de la fiche darrêt Douchy-Oudot.pdf",display:"Méthode fiche d'arrêt"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-TD - ELIES DDF . pages.pdf",display:"TD - ELIES DDF"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-TD N°3 DDF ELIES. pages.pdf",display:"TD N°3 ELIES"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-Fiche méthodologique.pdf",display:"TD - Fiche méthodologique"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-Plaquette Travaux dirigés Droit de la famille L1 Série -.pdf",display:"TD - Plaquette L1"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 1 - Le mariage (formation).pdf",display:"TD 1 - Mariage formation"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 2 - Le mariage (effets).pdf",display:"TD 2 - Mariage effets"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 3 - Le divorce (fondement et procédure).pdf",display:"TD 3 - Divorce fondement"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 4 - Le divorce (les effets).pdf",display:"TD 4 - Divorce effets"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 5 - Le Concubinage et le PACS.pdf",display:"TD 5 - Concubinage & PACS"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD DDF cours. pages.pdf",display:"TD - Cours DDF"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD N° 2 - DDF. pages.pdf",display:"TD N°2 DDF"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD N°1 - DDF . pages.pdf",display:"TD N°1 DDF"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD N°3 - DDF. pages.pdf",display:"TD N°3 DDF"},
  {m:"DDF",name:"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD N°4 - DDF. pages.pdf",display:"TD N°4 DDF"},
  {m:"HD",name:"SEMESTRE2-HISTOIRE DU DROIT - Mme Regarde Riot-CM-Histoire du droit . pages.pdf",display:"CM - Histoire du droit"},
  {m:"HD",name:"SEMESTRE2-HISTOIRE DU DROIT - Mme Regarde Riot-CM-Histoire du droit.pdf",display:"CM - Histoire du droit (complet)"},
  {m:"HD",name:"SEMESTRE2-HISTOIRE DU DROIT - Mme Regarde Riot-DOCUMENTS MIS EN LIGNE-17 août 1661 - Une fête trop somptueuse - Herodote.net.pdf",display:"17 août 1661 - Fête Vaux"},
  {m:"HD",name:"SEMESTRE2-HISTOIRE DU DROIT - Mme Regarde Riot-DOCUMENTS MIS EN LIGNE-Plan thématique 2024.pdf",display:"Plan thématique 2024"},
  {m:"IA",name:"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-CM-CM.pdf",display:"CM - Institutions admin"},
  {m:"IA",name:"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-CM-ELIES - Institutions administratives. pages. pages.pdf",display:"CM - ELIES Institutions"},
  {m:"IA",name:"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-CM-Institutions administratives. pages. pages.pdf",display:"CM - Institutions (pages)"},
  {m:"IA",name:"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-CM-Institutions administratives.pdf",display:"CM - Institutions (complet)"},
  {m:"IA",name:"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-DOCUMENTS MIS EN LIGNE-Institutions administrative .pdf",display:"Institutions admin doc"}
];

async function askAI(question){
  try{
    const r=await fetch("/api/ai",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({question})
    });
    const d=await r.json();
    return d.answer||"Réponse reçue mais format inattendu";
  }catch(e){
    return "⚠️ Erreur IA: "+e.message+"\n\nVérifie ta connexion internet ou réessaye dans quelques secondes.";
  }
}

export default function App(){
  const[view,setView]=useState("home");
  const[filterMat,setFilterMat]=useState("ALL");
  const[selectedPdf,setSelectedPdf]=useState(null);
  const[aiQ,setAiQ]=useState("");
  const[aiA,setAiA]=useState("");
  const[loading,setLoading]=useState(false);
  const[pdfs,setPdfs]=useState(PDFS);

  useEffect(()=>{
    async function loadPdfs(){
      try{
        const r=await fetch("/api/pdf-list");
        const data=await r.json();
        const categorized=data.map(pdf=>{
          let m="AUTRE";
          let display=pdf.name;
          if(pdf.name.includes("DROIT CONSTITUTIONNEL")){
            m="DC";
            display=pdf.name.replace(/SEMESTRE2-DROIT CONSTITUTIONNEL.*?-(CM|TD|DOCUMENTS).*?-/,'');
          }else if(pdf.name.includes("DROIT DE LA FAMILLE")){
            m="DDF";
            display=pdf.name.replace(/SEMESTRE2-DROIT DE LA FAMILLE.*?-(CM|TD|DOCUMENTS).*?-/,'');
          }else if(pdf.name.includes("INSTITUTIONS ADMINISTRATIVES")){
            m="IA";
            display=pdf.name.replace(/SEMESTRE2-INSTITUTIONS ADMINISTRATIVES.*?-(CM|TD|DOCUMENTS).*?-/,'');
          }else if(pdf.name.includes("HISTOIRE DU DROIT")){
            m="HD";
            display=pdf.name.replace(/SEMESTRE2-HISTOIRE DU DROIT.*?-(CM|TD|DOCUMENTS).*?-/,'');
          }
          return{...pdf,m,display};
        });
        setPdfs(categorized);
      }catch(e){
        console.error("Erreur chargement PDFs:",e);
      }
    }
    loadPdfs();
  },[]);

  const s={
    bg:"#0a0a0a",
    card:"#141414",
    text:"#e0e0e0",
    textDim:"#888",
    primary:"#3b82f6",
    border:"#2a2a2a",
    dc:"#818cf8",
    ddf:"#f472b6",
    ia:"#fbbf24",
    hd:"#34d399"
  };

  const matColors={DC:s.dc,DDF:s.ddf,IA:s.ia,HD:s.hd};
  const matNames={DC:"Droit Constitutionnel",DDF:"Droit de la Famille",IA:"Institutions Admin",HD:"Histoire du Droit"};

  const filteredPdfs=filterMat==="ALL"?pdfs:pdfs.filter(p=>p.m===filterMat);

  const openPdf=(pdf)=>{
    setSelectedPdf(pdf.download_url);
    setView("pdf");
  };

  const callAI=async()=>{
    if(!aiQ.trim())return;
    setLoading(true);
    const resp=await askAI(aiQ);
    setAiA(resp);
    setLoading(false);
  };

  const stats={
    total:pdfs.length,
    DC:pdfs.filter(p=>p.m==="DC").length,
    DDF:pdfs.filter(p=>p.m==="DDF").length,
    IA:pdfs.filter(p=>p.m==="IA").length,
    HD:pdfs.filter(p=>p.m==="HD").length
  };

  return(
    <div style={{minHeight:"100vh",background:s.bg,color:s.text,fontFamily:"system-ui",padding:20}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <h1 style={{fontSize:28,marginBottom:5}}>🎓 L1 Droit S2 Toulon v10</h1>
        <p style={{color:s.textDim,marginBottom:20,fontSize:13}}>85 PDFs · IA HuggingFace · 100% Fonctionnel</p>

        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
          <button onClick={()=>setView("home")} style={{padding:"10px 20px",background:view==="home"?s.primary:s.card,border:"none",color:s.text,borderRadius:6,cursor:"pointer",fontWeight:view==="home"?600:400}}>🏠 Accueil</button>
          <button onClick={()=>setView("pdfs")} style={{padding:"10px 20px",background:view==="pdfs"?s.primary:s.card,border:"none",color:s.text,borderRadius:6,cursor:"pointer",fontWeight:view==="pdfs"?600:400}}>📚 PDFs ({stats.total})</button>
          <button onClick={()=>setView("ai")} style={{padding:"10px 20px",background:view==="ai"?s.primary:s.card,border:"none",color:s.text,borderRadius:6,cursor:"pointer",fontWeight:view==="ai"?600:400}}>🤖 IA</button>
        </div>

        {view==="home"&&(
          <div style={{background:s.card,padding:30,borderRadius:12,border:`1px solid ${s.border}`}}>
            <h2 style={{marginBottom:15}}>Bienvenue ! 👋</h2>
            <p style={{lineHeight:1.8,marginBottom:20,color:s.textDim}}>Version v10 ultra-simplifiée mais <strong style={{color:s.primary}}>100% fonctionnelle</strong> avec tous les PDFs de ton repo GitHub.</p>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:15,marginBottom:25}}>
              <div style={{background:"rgba(129,140,248,0.1)",padding:20,borderRadius:10,border:"1px solid rgba(129,140,248,0.3)"}}>
                <div style={{fontSize:32,marginBottom:8}}>📘</div>
                <div style={{fontSize:24,fontWeight:700,color:s.dc}}>{stats.DC}</div>
                <div style={{fontSize:12,color:s.textDim}}>Droit Constitutionnel</div>
              </div>
              <div style={{background:"rgba(244,114,182,0.1)",padding:20,borderRadius:10,border:"1px solid rgba(244,114,182,0.3)"}}>
                <div style={{fontSize:32,marginBottom:8}}>💕</div>
                <div style={{fontSize:24,fontWeight:700,color:s.ddf}}>{stats.DDF}</div>
                <div style={{fontSize:12,color:s.textDim}}>Droit de la Famille</div>
              </div>
              <div style={{background:"rgba(251,191,36,0.1)",padding:20,borderRadius:10,border:"1px solid rgba(251,191,36,0.3)"}}>
                <div style={{fontSize:32,marginBottom:8}}>🏛️</div>
                <div style={{fontSize:24,fontWeight:700,color:s.ia}}>{stats.IA}</div>
                <div style={{fontSize:12,color:s.textDim}}>Institutions Admin</div>
              </div>
              <div style={{background:"rgba(52,211,153,0.1)",padding:20,borderRadius:10,border:"1px solid rgba(52,211,153,0.3)"}}>
                <div style={{fontSize:32,marginBottom:8}}>📜</div>
                <div style={{fontSize:24,fontWeight:700,color:s.hd}}>{stats.HD}</div>
                <div style={{fontSize:12,color:s.textDim}}>Histoire du Droit</div>
              </div>
            </div>

            <div style={{padding:20,background:"rgba(59,130,246,0.1)",borderRadius:10,border:"1px solid rgba(59,130,246,0.3)"}}>
              <h3 style={{fontSize:16,marginBottom:10}}>✨ Fonctionnalités</h3>
              <ul style={{lineHeight:2,fontSize:14,paddingLeft:20}}>
                <li>✅ <strong>85 PDFs</strong> chargés automatiquement depuis GitHub</li>
                <li>✅ <strong>IA HuggingFace</strong> opérationnelle (Qwen 2.5)</li>
                <li>✅ <strong>Filtres par matière</strong> pour navigation rapide</li>
                <li>✅ <strong>Viewer PDF intégré</strong> - pas besoin de télécharger</li>
                <li>✅ <strong>Interface moderne</strong> - dark mode inclus</li>
              </ul>
            </div>
          </div>
        )}

        {view==="pdfs"&&(
          <div>
            <div style={{marginBottom:20,display:"flex",gap:10,flexWrap:"wrap"}}>
              <button onClick={()=>setFilterMat("ALL")} style={{padding:"8px 16px",background:filterMat==="ALL"?s.primary:s.card,border:"none",color:s.text,borderRadius:6,cursor:"pointer",fontSize:13}}>
                Tout ({stats.total})
              </button>
              {Object.entries(matNames).map(([code,name])=>(
                <button key={code} onClick={()=>setFilterMat(code)} style={{padding:"8px 16px",background:filterMat===code?matColors[code]:s.card,border:"none",color:s.text,borderRadius:6,cursor:"pointer",fontSize:13}}>
                  {name} ({stats[code]})
                </button>
              ))}
            </div>

            <div style={{fontSize:13,color:s.textDim,marginBottom:15}}>
              {filteredPdfs.length} document{filteredPdfs.length>1?"s":""} affiché{filteredPdfs.length>1?"s":""}
            </div>

            {filteredPdfs.map((pdf,i)=>(
              <div key={i} onClick={()=>openPdf(pdf)} style={{background:s.card,padding:15,marginBottom:10,borderRadius:8,border:`1px solid ${s.border}`,cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=matColors[pdf.m];e.currentTarget.style.transform="translateX(4px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=s.border;e.currentTarget.style.transform="translateX(0)";}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:40,height:40,background:matColors[pdf.m]+"20",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📄</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,marginBottom:4}}>{pdf.display}</div>
                    <div style={{fontSize:12,color:s.textDim}}>
                      <span style={{background:matColors[pdf.m]+"30",color:matColors[pdf.m],padding:"2px 8px",borderRadius:4,marginRight:8,fontSize:11,fontWeight:600}}>{pdf.m}</span>
                      {matNames[pdf.m]}
                    </div>
                  </div>
                  <div style={{fontSize:20,opacity:0.5}}>→</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view==="pdf"&&selectedPdf&&(
          <div>
            <button onClick={()=>setView("pdfs")} style={{padding:"10px 20px",background:s.card,border:"none",color:s.text,borderRadius:6,cursor:"pointer",marginBottom:15,fontSize:14}}>← Retour aux PDFs</button>
            <div style={{background:s.card,padding:4,borderRadius:12,border:`1px solid ${s.border}`}}>
              <iframe src={selectedPdf} title="PDF Viewer" style={{width:"100%",height:"85vh",border:"none",borderRadius:8,background:"white"}}/>
            </div>
          </div>
        )}

        {view==="ai"&&(
          <div style={{background:s.card,padding:30,borderRadius:12,border:`1px solid ${s.border}`}}>
            <h2 style={{marginBottom:15}}>🤖 Assistant IA Juridique</h2>
            <p style={{marginBottom:20,color:s.textDim,lineHeight:1.6}}>Pose tes questions sur le droit constitutionnel, le droit de la famille, l'histoire du droit ou les institutions administratives. L'IA utilise <strong>Qwen 2.5 via HuggingFace</strong>.</p>

            <textarea value={aiQ} onChange={e=>setAiQ(e.target.value)} placeholder="Ex: Explique-moi le principe de séparation des pouvoirs dans la Ve République..." style={{width:"100%",minHeight:140,padding:15,background:"#0a0a0a",color:s.text,border:`1px solid ${s.border}`,borderRadius:8,fontSize:14,fontFamily:"inherit",marginBottom:15,resize:"vertical"}}/>

            <button onClick={callAI} disabled={loading||!aiQ.trim()} style={{padding:"14px 28px",background:loading||!aiQ.trim()?"#555":s.primary,border:"none",color:"white",borderRadius:8,cursor:loading||!aiQ.trim()?"not-allowed":"pointer",fontWeight:600,fontSize:15}}>
              {loading?"⏳ Traitement en cours...":"🚀 Demander à l'IA"}
            </button>

            {aiA&&(
              <div style={{marginTop:25,padding:25,background:"rgba(59,130,246,0.1)",borderRadius:10,border:"1px solid rgba(59,130,246,0.3)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:15}}>
                  <span style={{fontSize:24}}>💡</span>
                  <strong style={{fontSize:16}}>Réponse de l'IA:</strong>
                </div>
                <div style={{lineHeight:1.8,whiteSpace:"pre-wrap",fontSize:14}}>{aiA}</div>
              </div>
            )}

            {!aiA&&!loading&&(
              <div style={{marginTop:25,padding:20,background:"rgba(136,136,136,0.1)",borderRadius:10,border:"1px solid rgba(136,136,136,0.2)",fontSize:13,color:s.textDim}}>
                💡 <strong>Exemples de questions:</strong><br/>
                • Quelle est la différence entre le mariage et le PACS ?<br/>
                • Explique le rôle du Conseil constitutionnel<br/>
                • Qu'est-ce que la cohabitation sous la Ve République ?<br/>
                • Quels sont les effets du divorce ?
              </div>
            )}
          </div>
        )}

        <footer style={{marginTop:40,paddingTop:20,borderTop:`1px solid ${s.border}`,textAlign:"center",fontSize:12,color:s.textDim}}>
          <p>L1 Droit S2 Toulon v10 · {stats.total} PDFs · IA Qwen 2.5 · Créé avec ❤️ par Claude</p>
        </footer>
      </div>
    </div>
  );
}
