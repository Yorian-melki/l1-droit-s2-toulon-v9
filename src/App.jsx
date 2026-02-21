import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// ═══════════════════════════════════════════════
// L1 DROIT S2 TOULON — ENGINE v12
// Rose Palette · Deep Research · KB Chat · In-Progress · QCM HD
// ═══════════════════════════════════════════════

const V=12, SK="l1s2_v12";
const PDF_REPO="https://raw.githubusercontent.com/Yorian-melki/L1-droit-pdfs/main/";

const FILE_MAP={
  "Institutions administratives. pages. pages.pdf":"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-CM-Institutions administratives. pages. pages.pdf",
  "CM.pdf":"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-CM-CM.pdf",
  "ELIES - Institutions administratives. pages. pages.pdf":"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-CM-ELIES - Institutions administratives. pages. pages.pdf",
  "Institutions administratives.pdf":"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-CM-Institutions administratives.pdf",
  "Institutions administrative .pdf":"SEMESTRE2-INSTITUTIONS ADMINISTRATIVES-Mr Bardin-DOCUMENTS MIS EN LIGNE-Institutions administrative .pdf",
  "FICHES TD - DC S2.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-FICHES TD - DC S2.pdf",
  "TD - ELIES DC . pages.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD - ELIES DC . pages.pdf",
  "DISSERTATION.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-DISSERTATION .pdf",
  "SEANCE N°2 - DROIT CONSTIT.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°2 - DROIT CONSTIT.pdf",
  "SEANCE N°3 - DROIT CONSTIT .pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°3 - DROIT CONSTIT .pdf",
  "SEANCE N°1 - DROIT CONSTIT .pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°1 - DROIT CONSTIT .pdf",
  "SEANCE N°4 - DROIT CONSTIT.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°4 - DROIT CONSTIT.pdf",
  "SEANCE N°5 - DROIT CONSTIT .pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-SÉANCE N°5 - DROIT CONSTIT .pdf",
  "S_2__Les_origines_intellectuelles.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.2 - Les origines intellectuelles, les compromis et les ambiguïtes de la Constitution.pdf",
  "S.3 - Réforme 1962 - Présidentialisme majoritaire.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.3 - Réforme 1962 - Présidentialisme majoritaire.pdf",
  "S.4 - Réforme 1962 - Coahbitation.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.4 - Réforme 1962 - Coahbitation.pdf",
  "S.5 - Le présidentialisme renouvelé.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.5 - Le présidentialisme renouvelé.pdf",
  "S.7 - La fonction de contrôle du Parlement.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.7 - La fonction de contrôle du Parlement.pdf",
  "S.8 - La fonction législative.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.8 - La fonction législative.pdf",
  "S.10 - Le Conseil constitutionnel.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.10 - Le Conseil constitutionnel.pdf",
  "S.1 - La mise en place des institutions.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-S.1 - La mise en place des institutions.pdf",
  "TD DC semestre 2 - 2. pages.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD DC semestre 2 - 2. pages.pdf",
  "TD N°2 - DC . pages.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD N°2 - DC . pages.pdf",
  "TD N°3 - DC. pages.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD N°3 - DC. pages.pdf",
  "Fiche définitions TD - droit constitutionnel. pages.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-Fiche définitions TD - droit constitutionnel. pages.pdf",
  "Plaquette 2024-2025.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-Plaquette 2024-2025.pdf",
  "TD DC semestre 2 -. pages.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-TD - Solome Etse-TD DC semestre 2 -. pages.pdf",
  "Droit constitutionnel de la V° République (1). pages.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Droit constitutionnel de la V° République (1). pages.pdf",
  "Droit Constitutionnel de la V° République. pages.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Droit Constitutionnel de la V° République. pages.pdf",
  "ELIES - Droit constit de la 5ème république. pages.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-ELIES - Droit constit de la 5ème république. pages.pdf",
  "Plan du cours 2026.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Plan du cours 2026.pdf",
  "Droit Constitutionnel de la Vème République.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Droit Constitutionnel de la Vème République.pdf",
  "Ve République.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-CM-Ve République.pdf",
  "articles droit constitutionnel.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-articles droit constitutionnel.pdf",
  "Fiche exercices TD droit constitutionnel .pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Fiche exercices TD droit constitutionnel .pdf",
  "Fiche TD .pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Fiche TD .pdf",
  "Résumé cours DC moodle 2 .pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Résumé cours DC moodle 2 .pdf",
  "dates droit constitutionnel.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-dates droit constitutionnel.pdf",
  "Fiche définitions TD - droit constitutionnel.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Fiche définitions TD - droit constitutionnel.pdf",
  "Résumer cours DC moodle.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Résumer cours DC moodle.pdf",
  "Fiche 4. Adoption et révision des Constitutions Cairn.info.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Fiche 4. Adoption et révision des Constitutions  Cairn.info.pdf",
  "La Constitution de la Ve République - Conseil constitutionnel.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-La Constitution de la Ve République - comment est-elle née   Conseil constitutionnel.pdf",
  "Quels ont été les temps forts de l'élaboration - vie-publique.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Quels ont été les temps forts de l'élaboration de la Constitution  vie-publique.fr.pdf",
  "Texte intégral de la Constitution du 4 octobre 1958.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Texte intégral de la Constitution du 4 octobre 1958 en vigueur  Conseil constitutionnel.pdf",
  "Variations sur l'éthique - Bruxelles.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Variations sur l'éthique - Réflexions sur la légitimité du référendum constituant - Presses universitaires Saint-Louis Bruxelles.pdf",
  "introduction .pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-introduction .pdf",
  "Cours du 12 mars 2025.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Cours du 12 mars 2025.pdf",
  "Première Partie.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Première Partie.pdf",
  "seconde partie semestre 2.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-seconde partie semestre 2.pdf",
  "sources de la Ve.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-sources de la Ve.pdf",
  "Séminaire normes 1 .pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Séminaire normes 1 .pdf",
  "Séminaire normes 2 .pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-Séminaire normes 2..pdf",
  "guide le Gistique de 2007.pdf":"SEMESTRE2-DROIT CONSTITUTIONNEL DE LA Ve RÉPUBLIQUE-Mr Bardin-DOCUMENTS MIS EN LIGNE-guide le Gistique de 2007.pdf",
  "Droit de la famille . pages.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-CM-Droit de la famille . pages.pdf",
  "TD - ELIES DDF . pages.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-TD - ELIES DDF . pages.pdf",
  "TD N 3 DDF ELIES. pages.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-TD N°3 DDF ELIES. pages.pdf",
  "Méthode de la fiche darrêt DouchyOudot.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Méthode de la fiche darrêt Douchy-Oudot.pdf",
  "Lois et décisions - DDF.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Lois et décisions - DDF.pdf",
  "Extrait de la méthode du Pr beaussonie commentaire.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Extrait de la méthode du Pr beaussonie commentaire.pdf",
  "Éléments de méthode rappel.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Eléments de méthode rappel.pdf",
  "4 - CA Nimes 14 avril 2020.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-4. CA Nimes 14 avril 2020.pdf",
  "6 -.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-6. .pdf",
  "7 - cdcm v4.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-7. cdcm_v4.pdf",
  "8 - H W c- FRANCE.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-8. H.W. c. FRANCE.pdf",
  "TRICOT.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-DOCUMENTS MIS EN LIGNE-Cour de cassation - LÉLABORATION DUN ARRET DE LA COUR DE CASSATION (1) - Etude par Daniel TRICOT.pdf",
  "TD N° 2 - DDF. pages.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD N° 2 - DDF. pages.pdf",
  "TD 5 - Le Concubinage et le PACS.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 5 - Le Concubinage et le PACS.pdf",
  "Fiche méthodologique.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-Fiche méthodologique.pdf",
  "TD 2 - Le mariage effets.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 2 - Le mariage (effets).pdf",
  "TD N 3 - DDF. pages.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD N°3 - DDF. pages.pdf",
  "TD N 4 - DDF. pages.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD N°4 - DDF. pages.pdf",
  "TD 4 - Le divorce les effets.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 4 - Le divorce (les effets).pdf",
  "TD DDF cours. pages.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD DDF cours. pages.pdf",
  "TD 1 - Le mariage formation.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 1 - Le mariage (formation).pdf",
  "TD N° 1 - DDF . pages.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD N°1 - DDF . pages.pdf",
  "TD 3 - Le divorce fondement et procédure.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-TD 3 - Le divorce (fondement et procédure).pdf",
  "Plaquette TD Droit de la famille L1.pdf":"SEMESTRE2-DROIT DE LA FAMILLE - Mme Douchy-Oudot-TD - Viallet Jean Jacques-Plaquette Travaux dirigés Droit de la famille L1 Série -.pdf",
  "Histoire du droit . pages.pdf":"SEMESTRE2-HISTOIRE DU DROIT - Mme Regarde Riot-CM-Histoire du droit . pages.pdf",
  "Histoire du droit.pdf":"SEMESTRE2-HISTOIRE DU DROIT - Mme Regarde Riot-CM-Histoire du droit.pdf",
  "Plan thématique 2024.pdf":"SEMESTRE2-HISTOIRE DU DROIT - Mme Regarde Riot-DOCUMENTS MIS EN LIGNE-Plan thématique 2024.pdf",
  "17 août 1661 - Une fête trop somptueuse.pdf":"SEMESTRE2-HISTOIRE DU DROIT - Mme Regarde Riot-DOCUMENTS MIS EN LIGNE-17 août 1661 - Une fête trop somptueuse - Herodote.net.pdf",
};

const pdfRawUrl=f=>{const r=FILE_MAP[f]||f;return PDF_REPO+encodeURIComponent(r.normalize("NFD"));};
const pdfViewUrl=f=>`https://docs.google.com/viewer?url=${encodeURIComponent(pdfRawUrl(f))}&embedded=true`;

// ── PALETTE ROSE ─────────────────────────────────────────
const LIGHT={bg:"#FDF2F2",sf:"#FADAD9",sf2:"#F3C3C5",pri:"#C65C69",priS:"#9B3A47",priH:"#D78289",accS:"#F3C3C5",accR:"#E9ABAE",tx:"#2D1215",tx2:"#7A4048",tx3:"#A06570",bdr:"#E9ABAE",err:"#C0392B",ok:"#2E7D5A",warn:"#f59e0b",white:"#fff",sidebarBg:"#F5E0E0"};
const DARK={bg:"#1A0A0B",sf:"#2A1415",sf2:"#3A1E20",pri:"#D78289",priS:"#FADAD9",priH:"#E9ABAE",accS:"#3A1E20",accR:"#CE6F79",tx:"#FADAD9",tx2:"#CE6F79",tx3:"#8A5560",bdr:"#4A2530",err:"#E57373",ok:"#5A9970",warn:"#f59e0b",white:"#FADAD9",sidebarBg:"#150A0B"};

// ── MATIÈRES (types exercices corrigés) ───────────────────
const M={
  DC:{id:"DC",full:"Droit constitutionnel de la Ve République",prof:"Mr Bardin",type:"MAJEURE",ects:5,c:"#C65C69",
    eval:"TD + Galop + Examen final (dissertation / commentaire de texte)",
    ex:["Dissertation","Cas pratique","Commentaire de texte"],td:"Solome Etse"},
  DDF:{id:"DDF",full:"Droit de la famille",prof:"Mme Douchy-Oudot",type:"MAJEURE",ects:5,c:"#D78289",
    eval:"TD + Galop + Examen final (cas pratique / commentaire d'arrêt)",
    ex:["Cas pratique","Commentaire d'arrêt","Commentaire de texte","Commentaire d'article","Fiche d'arrêt","Dissertation"],td:"Viallet Jean-Jacques"},
  IA:{id:"IA",full:"Institutions administratives",prof:"Mr Bardin",type:"MINEURE",ects:3,c:"#CE6F79",
    eval:"Examen final uniquement (pas de TD)",ex:["Questions de cours","QCM","Dissertation"],td:null},
  HD:{id:"HD",full:"Histoire du droit",prof:"Mme Regarde-Riot",type:"MINEURE",ects:3,c:"#E0959C",
    eval:"Examen final uniquement (pas de TD)",ex:["Questions de cours","QCM","Dissertation"],td:null},
};

// ── 37 THÈMES ────────────────────────────────────────────
const T=[
  {id:"DC_S1",m:"DC",n:"S1 – Mise en place des institutions",ax:"TD",v:true,src:["S.1 - La mise en place des institutions.pdf"]},
  {id:"DC_S2",m:"DC",n:"S2 – Origines intellectuelles, compromis",ax:"TD",v:true,src:["S_2__Les_origines_intellectuelles.pdf"]},
  {id:"DC_S3",m:"DC",n:"S3 – Réforme 1962 / Présidentialisme",ax:"TD",v:true,src:["S.3 - Réforme 1962 - Présidentialisme majoritaire.pdf"]},
  {id:"DC_S4",m:"DC",n:"S4 – Cohabitation",ax:"TD",v:true,src:["S.4 - Réforme 1962 - Coahbitation.pdf"]},
  {id:"DC_S5",m:"DC",n:"S5 – Présidentialisme renouvelé",ax:"TD",v:true,src:["S.5 - Le présidentialisme renouvelé.pdf"]},
  {id:"DC_S7",m:"DC",n:"S7 – Contrôle du Parlement",ax:"TD",v:true,src:["S.7 - La fonction de contrôle du Parlement.pdf"]},
  {id:"DC_S8",m:"DC",n:"S8 – Fonction législative",ax:"TD",v:true,src:["S.8 - La fonction législative.pdf"]},
  {id:"DC_S10",m:"DC",n:"S10 – Le Conseil constitutionnel",ax:"TD",v:true,src:["S.10 - Le Conseil constitutionnel.pdf"]},
  {id:"DC_S6",m:"DC",n:"S6 – Le statut du Président",ax:"TD",v:false,src:[]},
  {id:"DC_S9",m:"DC",n:"S9 – Le Gouvernement",ax:"TD",v:false,src:[]},
  {id:"DC_INTRO",m:"DC",n:"Introduction générale",ax:"CM",v:true,src:["introduction .pdf","Plan du cours 2026.pdf"]},
  {id:"DC_P1",m:"DC",n:"Première Partie – Naissance et sources",ax:"CM",v:true,src:["Première Partie.pdf","sources de la Ve.pdf"]},
  {id:"DC_P2",m:"DC",n:"Seconde Partie – Institutions",ax:"CM",v:true,src:["seconde partie semestre 2.pdf"]},
  {id:"DC_NORM",m:"DC",n:"Séminaire normes constitutionnelles",ax:"CM",v:true,src:["Séminaire normes 1 .pdf","Séminaire normes 2 .pdf"]},
  {id:"DC_DATES",m:"DC",n:"Dates & définitions clés",ax:"REV",v:true,src:["dates droit constitutionnel.pdf","Fiche définitions TD - droit constitutionnel.pdf"]},
  {id:"DC_RESUME",m:"DC",n:"Résumés & fiches de révision",ax:"REV",v:true,src:["Résumé cours DC moodle 2 .pdf"]},
  {id:"DDF_T1",m:"DDF",n:"TD1 – Le mariage : formation",ax:"TD",v:true,src:["TD 1 - Le mariage formation.pdf"]},
  {id:"DDF_T2",m:"DDF",n:"TD2 – Le mariage : effets",ax:"TD",v:true,src:["TD 2 - Le mariage effets.pdf"]},
  {id:"DDF_T3",m:"DDF",n:"TD3 – Le divorce : fondement et procédure",ax:"TD",v:true,src:["TD 3 - Le divorce fondement et procédure.pdf"]},
  {id:"DDF_T4",m:"DDF",n:"TD4 – Le divorce : effets",ax:"TD",v:true,src:["TD 4 - Le divorce les effets.pdf"]},
  {id:"DDF_T5",m:"DDF",n:"TD5 – Concubinage et PACS",ax:"TD",v:true,src:["TD 5 - Le Concubinage et le PACS.pdf"]},
  {id:"DDF_CM",m:"DDF",n:"Cours magistral complet",ax:"CM",v:true,src:["Droit de la famille . pages.pdf"]},
  {id:"DDF_METH",m:"DDF",n:"Méthodologie (fiche d'arrêt, commentaire)",ax:"METH",v:true,src:["Méthode de la fiche darrêt DouchyOudot.pdf"]},
  {id:"DDF_JP",m:"DDF",n:"Jurisprudence & textes de référence",ax:"REV",v:true,src:["Lois et décisions - DDF.pdf"]},
  {id:"DDF_FIL",m:"DDF",n:"Filiation",ax:"CM",v:false,src:[]},
  {id:"DDF_AP",m:"DDF",n:"Autorité parentale",ax:"CM",v:false,src:[]},
  {id:"IA_1",m:"IA",n:"Administration centrale de l'État",ax:"MEM",v:true,src:["Institutions administratives.pdf"]},
  {id:"IA_2",m:"IA",n:"Administration déconcentrée",ax:"MEM",v:true,src:["CM.pdf"]},
  {id:"IA_3",m:"IA",n:"Collectivités territoriales",ax:"MEM",v:false,src:[]},
  {id:"IA_4",m:"IA",n:"Établissements publics",ax:"MEM",v:false,src:[]},
  {id:"IA_5",m:"IA",n:"Contrôle de l'administration",ax:"MEM",v:false,src:[]},
  {id:"IA_6",m:"IA",n:"Principes généraux d'organisation",ax:"MEM",v:true,src:["Institutions administratives.pdf"]},
  {id:"HD_1",m:"HD",n:"L'État avant la Révolution",ax:"MEM",v:true,src:["Histoire du droit . pages.pdf"]},
  {id:"HD_2",m:"HD",n:"La Justice sous l'Ancien Régime",ax:"MEM",v:true,src:["Histoire du droit.pdf"]},
  {id:"HD_3",m:"HD",n:"Sources du droit (Ancien Régime)",ax:"MEM",v:true,src:["Plan thématique 2024.pdf"]},
  {id:"HD_4",m:"HD",n:"Révolution et transformation du droit",ax:"MEM",v:false,src:[]},
  {id:"HD_5",m:"HD",n:"Sources modernes du droit français",ax:"MEM",v:false,src:[]},
];

// ── 85 KB FILES ──────────────────────────────────────────
const KB=[
  {id:1,f:"Institutions administratives. pages. pages.pdf",m:"IA",t:"CM",s:"Moi",o:true},
  {id:2,f:"CM.pdf",m:"IA",t:"CM",s:"Moi",o:true},
  {id:3,f:"ELIES - Institutions administratives. pages. pages.pdf",m:"IA",t:"CM",s:"ELIES",o:true},
  {id:4,f:"Institutions administratives.pdf",m:"IA",t:"CM",s:"Externe",o:false},
  {id:5,f:"Institutions administrative .pdf",m:"IA",t:"DOC",s:"Externe",o:false},
  {id:6,f:"FICHES TD - DC S2.pdf",m:"DC",t:"TD",s:"Moi",o:true},
  {id:7,f:"TD - ELIES DC . pages.pdf",m:"DC",t:"TD",s:"ELIES",o:false},
  {id:8,f:"DISSERTATION.pdf",m:"DC",t:"TD",s:"Moi",o:false},
  {id:9,f:"SEANCE N°2 - DROIT CONSTIT.pdf",m:"DC",t:"TD",s:"Moi",o:false},
  {id:10,f:"SEANCE N°3 - DROIT CONSTIT .pdf",m:"DC",t:"TD",s:"Moi",o:false},
  {id:11,f:"SEANCE N°1 - DROIT CONSTIT .pdf",m:"DC",t:"TD",s:"Moi",o:false},
  {id:12,f:"SEANCE N°4 - DROIT CONSTIT.pdf",m:"DC",t:"TD",s:"Moi",o:false},
  {id:13,f:"SEANCE N°5 - DROIT CONSTIT .pdf",m:"DC",t:"TD",s:"Moi",o:false},
  {id:14,f:"S_2__Les_origines_intellectuelles.pdf",m:"DC",t:"TD",s:"Prof",o:true},
  {id:15,f:"S.3 - Réforme 1962 - Présidentialisme majoritaire.pdf",m:"DC",t:"TD",s:"Prof",o:true},
  {id:16,f:"S.4 - Réforme 1962 - Coahbitation.pdf",m:"DC",t:"TD",s:"Prof",o:true},
  {id:17,f:"S.5 - Le présidentialisme renouvelé.pdf",m:"DC",t:"TD",s:"Prof",o:true},
  {id:18,f:"S.7 - La fonction de contrôle du Parlement.pdf",m:"DC",t:"TD",s:"Prof",o:true},
  {id:19,f:"S.8 - La fonction législative.pdf",m:"DC",t:"TD",s:"Prof",o:true},
  {id:20,f:"S.10 - Le Conseil constitutionnel.pdf",m:"DC",t:"TD",s:"Prof",o:true},
  {id:21,f:"S.1 - La mise en place des institutions.pdf",m:"DC",t:"TD",s:"Prof",o:true},
  {id:22,f:"TD DC semestre 2 - 2. pages.pdf",m:"DC",t:"TD",s:"ELIES",o:false},
  {id:23,f:"TD N°2 - DC . pages.pdf",m:"DC",t:"TD",s:"Moi",o:false},
  {id:24,f:"TD N°3 - DC. pages.pdf",m:"DC",t:"TD",s:"Moi",o:false},
  {id:25,f:"Fiche définitions TD - droit constitutionnel. pages.pdf",m:"DC",t:"TD",s:"Moi",o:false},
  {id:26,f:"Plaquette 2024-2025.pdf",m:"DC",t:"TD",s:"Prof",o:true},
  {id:27,f:"TD DC semestre 2 -. pages.pdf",m:"DC",t:"TD",s:"ELIES",o:false},
  {id:28,f:"Droit constitutionnel de la V° République (1). pages.pdf",m:"DC",t:"CM",s:"Externe",o:true},
  {id:29,f:"Droit Constitutionnel de la V° République. pages.pdf",m:"DC",t:"CM",s:"Moi",o:true},
  {id:30,f:"ELIES - Droit constit de la 5ème république. pages.pdf",m:"DC",t:"CM",s:"ELIES",o:true},
  {id:31,f:"Plan du cours 2026.pdf",m:"DC",t:"CM",s:"Prof",o:true},
  {id:32,f:"Droit Constitutionnel de la Vème République.pdf",m:"DC",t:"CM",s:"Externe",o:true},
  {id:33,f:"Ve République.pdf",m:"DC",t:"CM",s:"Externe",o:false},
  {id:34,f:"articles droit constitutionnel.pdf",m:"DC",t:"DOC",s:"Moi",o:true},
  {id:35,f:"Fiche exercices TD droit constitutionnel .pdf",m:"DC",t:"DOC",s:"Moi",o:false},
  {id:36,f:"Fiche TD .pdf",m:"DC",t:"DOC",s:"Moi",o:false},
  {id:37,f:"Résumé cours DC moodle 2 .pdf",m:"DC",t:"DOC",s:"Moi",o:false},
  {id:38,f:"dates droit constitutionnel.pdf",m:"DC",t:"DOC",s:"Moi",o:true},
  {id:39,f:"Fiche définitions TD - droit constitutionnel.pdf",m:"DC",t:"DOC",s:"Moi",o:false},
  {id:40,f:"Résumer cours DC moodle.pdf",m:"DC",t:"DOC",s:"Moi",o:false},
  {id:41,f:"Fiche 4. Adoption et révision des Constitutions Cairn.info.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:42,f:"La Constitution de la Ve République - Conseil constitutionnel.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:43,f:"Quels ont été les temps forts de l'élaboration - vie-publique.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:44,f:"Texte intégral de la Constitution du 4 octobre 1958.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:45,f:"Variations sur l'éthique - Bruxelles.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:46,f:"introduction .pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:47,f:"Cours du 12 mars 2025.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:48,f:"Première Partie.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:49,f:"seconde partie semestre 2.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:50,f:"sources de la Ve.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:51,f:"Séminaire normes 1 .pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:52,f:"Séminaire normes 2 .pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:53,f:"guide le Gistique de 2007.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:54,f:"Droit de la famille . pages.pdf",m:"DDF",t:"CM",s:"Moi",o:true},
  {id:55,f:"TD - ELIES DDF . pages.pdf",m:"DDF",t:"DOC",s:"ELIES",o:false},
  {id:56,f:"TD N 3 DDF ELIES. pages.pdf",m:"DDF",t:"DOC",s:"ELIES",o:false},
  {id:57,f:"Méthode de la fiche darrêt DouchyOudot.pdf",m:"DDF",t:"METH",s:"Prof",o:true},
  {id:58,f:"Lois et décisions - DDF.pdf",m:"DDF",t:"DOC",s:"Prof",o:true},
  {id:59,f:"Extrait de la méthode du Pr beaussonie commentaire.pdf",m:"DDF",t:"METH",s:"Prof",o:true},
  {id:60,f:"Éléments de méthode rappel.pdf",m:"DDF",t:"METH",s:"Prof",o:true},
  {id:61,f:"4 - CA Nimes 14 avril 2020.pdf",m:"DDF",t:"DOC",s:"Prof",o:true},
  {id:62,f:"6 -.pdf",m:"DDF",t:"DOC",s:"Prof",o:true},
  {id:63,f:"7 - cdcm v4.pdf",m:"DDF",t:"DOC",s:"Prof",o:true},
  {id:64,f:"8 - H W c- FRANCE.pdf",m:"DDF",t:"DOC",s:"Prof",o:true},
  {id:65,f:"TD N° 2 - DDF. pages.pdf",m:"DDF",t:"TD",s:"Moi",o:false},
  {id:66,f:"TD 5 - Le Concubinage et le PACS.pdf",m:"DDF",t:"TD",s:"Prof",o:true},
  {id:67,f:"Fiche méthodologique.pdf",m:"DDF",t:"METH",s:"Prof",o:true},
  {id:68,f:"TD 2 - Le mariage effets.pdf",m:"DDF",t:"TD",s:"Prof",o:true},
  {id:69,f:"TD N 3 - DDF. pages.pdf",m:"DDF",t:"TD",s:"Moi",o:false},
  {id:70,f:"TD N 4 - DDF. pages.pdf",m:"DDF",t:"TD",s:"Moi",o:false},
  {id:71,f:"TD 4 - Le divorce les effets.pdf",m:"DDF",t:"TD",s:"Prof",o:true},
  {id:72,f:"TD DDF cours. pages.pdf",m:"DDF",t:"TD",s:"Moi",o:false},
  {id:73,f:"TD 1 - Le mariage formation.pdf",m:"DDF",t:"TD",s:"Prof",o:true},
  {id:74,f:"TD N° 1 - DDF . pages.pdf",m:"DDF",t:"TD",s:"Moi",o:false},
  {id:75,f:"TD 3 - Le divorce fondement et procédure.pdf",m:"DDF",t:"TD",s:"Prof",o:true},
  {id:76,f:"Plaquette TD Droit de la famille L1.pdf",m:"DDF",t:"TD",s:"Prof",o:true},
  {id:77,f:"Histoire du droit . pages.pdf",m:"HD",t:"CM",s:"Moi",o:true},
  {id:78,f:"Histoire du droit.pdf",m:"HD",t:"CM",s:"Externe",o:false},
  {id:79,f:"Plan thématique 2024.pdf",m:"HD",t:"DOC",s:"Prof",o:true},
  {id:80,f:"17 août 1661 - Une fête trop somptueuse.pdf",m:"HD",t:"DOC",s:"Prof",o:true},
  {id:81,f:"Constitution texte intégral.pdf",m:"DC",t:"DOC",s:"Prof",o:true},
  {id:82,f:"TRICOT.pdf",m:"DDF",t:"DOC",s:"Externe",o:false},
  {id:83,f:"Transcript en KB.pdf",m:"DC",t:"DOC",s:"Externe",o:false},
  {id:84,f:"Dionnel.pdf",m:"DC",t:"DOC",s:"Externe",o:false},
  {id:85,f:"D_civil.pdf",m:"DDF",t:"DOC",s:"Externe",o:false},
];

// ── ANNALES (50 entrées avec source & body) ───────────────
const mkAn=(id,m,y,t,s,th,prof,src,body=null)=>({id,m,y,t,s,th,prof,source:src,body});
const AN=[
  // ─── DC ─────────────────────────────────────────────────
  mkAn(1,"DC","2021-22","Dissertation","Les transformations du rôle du Conseil constitutionnel sous la Vème République",["DC_S10","DC_P2"],"Mr Bardin","(Annale session 1, 2021-22, Mr Bardin, Université de Toulon)"),
  mkAn(2,"DC","2021-22","Commentaire de texte","Conférence de presse du Général de Gaulle, 31 janvier 1964",["DC_S3","DC_P1"],"Mr Bardin","(Annale, 2021-22, Mr Bardin, Université de Toulon)",
`TEXTE À COMMENTER (source : conférence de presse officielle, domaine public)

« L’autorité indivisible de l’État est confiée tout entière au Président par le peuple qui l’a élu. Il n’en existe aucune autre, ni ministérielle, ni civile, ni militaire, ni judiciaire, qui ne soit conférée et maintenue par lui. Il lui appartient d’ajuster le domaine suprême de l’action entre les domaines où l’intérêt supérieur du pays exige qu’il agisse personnellement et ceux qu’il délègue à d’autres. »
(Charles de Gaulle, Conférence de presse, 31 janvier 1964)

CONSIGNE : Commentez ce texte. Vous vous interrogerez sur la conception gaullienne des institutions et son empreinte sur la pratique de la Ve République.`),
  mkAn(3,"DC","2019","Dissertation","La loi n’est pas véritablement écrite par le Parlement sous la Ve République",["DC_S8","DC_S7"],"Mr Bardin","(Annale, 2019, Mr Bardin, Université de Toulon)"),
  mkAn(4,"DC","2019","Dissertation","Le Parlement et la loi sous la Vème République",["DC_S8","DC_S7"],"Mr Bardin","(Annale, 2019, Mr Bardin, Université de Toulon)"),
  mkAn(5,"DC","2019","Dissertation","Le président de la Ve République n’est pas entièrement irresponsable",["DC_S5","DC_P2"],"Mr Bardin","(Annale, 2019, Mr Bardin, Université de Toulon)"),
  mkAn(6,"DC","2019","Dissertation","La démission du Premier Ministre sous la Vème République",["DC_S4","DC_P2"],"Mr Bardin","(Annale, 2019, Mr Bardin, Université de Toulon)"),
  mkAn(7,"DC","2019","Dissertation","Le référendum sous la Ve République",["DC_S3","DC_P1"],"Mr Bardin","(Annale, 2019, Mr Bardin, Université de Toulon)"),
  mkAn(8,"DC","2019","Commentaire de texte","François Mitterrand, Message au Parlement, 8 avril 1986",["DC_S4"],"Mr Bardin","(Annale, 2019, Mr Bardin, Université de Toulon)",
`TEXTE À COMMENTER (source : Journal officiel, domaine public)

« Le Président de la République [...] a désigné comme Premier ministre le leader de la majorité parlementaire conformément à l’esprit des institutions. [...] Les droits constitutionnels du Président de la République demeurent entiers. Je veillerai à ce que les accords internationaux soient respectés et à ce que la continuité de l’État soit assurée. »
(François Mitterrand, Message au Parlement, 8 avril 1986)

CONSIGNE : Commentez ce texte en le situânt dans le contexte de la cohabitation de 1986-1988.`),
  mkAn(9,"DC","2019","Dissertation","Le Parlement français a-t-il encore des droits ?",["DC_S7","DC_S8"],"Mr Bardin","(Annale, 2019, Mr Bardin, Université de Toulon)"),
  mkAn(10,"DC","2019","Commentaire de texte","Discours de Michel Debré devant le Conseil d’État, 27 août 1958",["DC_S1","DC_P1"],"Mr Bardin","(Annale, 2019, Mr Bardin, Université de Toulon)",
`TEXTE À COMMENTER (source : Archives nationales, domaine public)

« Ce régime n’est pas présidentiel car les responsabilités ne sont pas séparées : la responsabilité des ministres devant le Parlement est maintenue. [...] Il est un régime parlementaire, mais un parlementarisme rationalisé. [...] Pour qu’un gouvernement soit fort, il lui faut un chef. Ce chef ne peut être le président de la République si le principe de la responsabilité gouvernementale est maintenu. Ce chef doit donc être le Premier ministre. »
(Michel Debré, Discours devant le Conseil d’État, 27 août 1958)

CONSIGNE : Commentez ce texte en dégageant la conception du parlementarisme rationalisé qu’il exprime.`),
  mkAn(11,"DC","2017","Commentaire de texte","Commentaire de l’article 3 de la Constitution de 1958",["DC_P1","DC_NORM"],"Mr Bardin","(Annale, 2017, Mr Bardin, Université de Toulon)",
`ARTICLE À COMMENTER (texte officiel, domaine public)

Article 3 de la Constitution du 4 octobre 1958 :
« La souveraineté nationale appartient au peuple qui l’exerce par ses représentants et par la voie du référendum.
Aucune section du peuple ni aucun individu ne peut s’en attribuer l’exercice.
Le suffrage peut être direct ou indirect dans les conditions prévues par la Constitution. Il est toujours universel, égal et secret. »

CONSIGNE : Commentez cet article en vous interrogeant sur les fondements et les limites de la souveraineté populaire sous la Ve République.`),
  mkAn(12,"DC","2017","Dissertation","Pourquoi une Sixième République ?",["DC_P1","DC_P2"],"Mr Bardin","(Annale, 2017, Mr Bardin, Université de Toulon)"),
  mkAn(13,"DC","2017","Dissertation","La revalorisation du parlementarisme",["DC_S7","DC_S8"],"Mr Bardin","(Annale, 2017, Mr Bardin, Université de Toulon)"),
  mkAn(14,"DC","2017","Commentaire de texte","Commentaire des articles 5 à 22 de la Constitution de 1958",["DC_P2","DC_S5"],"Mr Bardin","(Annale, 2017, Mr Bardin, Université de Toulon)",
`ARTICLES À COMMENTER (texte officiel, domaine public)

Articles 5 à 22 de la Constitution du 4 octobre 1958 relatifs au Président de la République et au Gouvernement.

Article 5 : « Le Président de la République veille au respect de la Constitution. Il assure, par son arbitrage, le fonctionnement régulier des pouvoirs publics ainsi que la continuité de l’État. Il est le garant de l’indépendance nationale, de l’intégrité du territoire et du respect des traités. »
[Articles 6-22 accessibles dans le texte intégral de la Constitution - Conseil constitutionnel]

CONSIGNE : Commentez ces dispositions en analysant l’équilibre institutionnel qu’elles établissent entre le Président de la République et le Gouvernement.`),
  mkAn(15,"DC","2017","Dissertation","Les différentes significations de la fonction d’arbitrage présidentiel",["DC_S5","DC_S3"],"Mr Bardin","(Annale, 2017, Mr Bardin, Université de Toulon)"),
  mkAn(16,"DC","2021-22","Dissertation","L’incidence cumulée des trois révisions de l’article 6 de la Constitution",["DC_S3","DC_P1"],"Mr Bardin","(Annale, 2021-22, Mr Bardin, Université de Toulon)"),
  mkAn(17,"DC","2017-18","Dissertation","Questions à traiter (session 2) — DC Ve République",["DC_P1","DC_P2"],"Mr Bardin","(Annale session 2, 2017-18, Mr Bardin, Université de Toulon)"),
  mkAn(18,"DC","2022-23","Commentaire de texte","Article 5 de la Constitution de 1958 (fonction présidentielle)",["DC_S5","DC_P2"],"Mr Bardin","(Annale, 2022-23, Mr Bardin, Université de Toulon — vérifier via Moodle UNIV-TLN)",
`ARTICLE À COMMENTER (texte officiel, domaine public)

Article 5 de la Constitution du 4 octobre 1958 :
« Le Président de la République veille au respect de la Constitution. Il assure, par son arbitrage, le fonctionnement régulier des pouvoirs publics ainsi que la continuité de l’État. Il est le garant de l’indépendance nationale, de l’intégrité du territoire et du respect des traités. »

CONSIGNE : Commentez cet article. Vous vous interrogerez notamment sur le sens et la portée de la notion d’arbitrage présidentiel sous la Ve République.`),
  mkAn(19,"DC","2023-24","Dissertation","Le bicéphalisme de l’exécutif sous la Ve République",["DC_P2","DC_S5"],"Mr Bardin","(Sujet type examen, cohérent avec le programme de Mr Bardin, Université de Toulon)"),
  mkAn(20,"DC","2023-24","Commentaire de texte","Décision CC n° 71-44 DC, 16 juillet 1971 (Liberté d’association)",["DC_S10","DC_NORM"],"Mr Bardin","(Sujet type examen, cohérent avec le programme de Mr Bardin, Université de Toulon)",
`TEXTE À COMMENTER (décision officielle, domaine public)

Conseil constitutionnel, 16 juillet 1971, Décision n° 71-44 DC :
« Considérant qu’au nombre des principes fondamentaux reconnus par les lois de la République et solennellement réaffirmés par le Préambule de la Constitution, il y a lieu de ranger le principe de la liberté d’association ; que ce principe est à la base des dispositions générales de la loi du 1er juillet 1901 relative au contrat d’association ; qu’en vertu de ce principe, les associations se constituent librement et peuvent être rendues publiques sous la seule réserve du dépôt d’une déclaration préalable. »

CONSIGNE : Commentez cette décision en dégageant son apport fondamental au droit constitutionnel français.`),
  mkAn(21,"DC","2024-25","Cas pratique","Cas pratique — Droit constitutionnel de la Ve République",["DC_P2","DC_S7"],"Mr Bardin","(Sujet type examen, cohérent avec le programme de Mr Bardin, Université de Toulon)"),
  mkAn(22,"DC","2023-24","Dissertation","La révision constitutionnelle du 23 juillet 2008",["DC_S5","DC_S7"],"Mr Bardin","(Sujet type examen, cohérent avec le programme de Mr Bardin, Université de Toulon)"),
  mkAn(23,"DC","2022-23","Dissertation","Le Conseil constitutionnel, gardien de la Constitution",["DC_S10","DC_P2"],"Mr Bardin","(Sujet type examen, cohérent avec le programme de Mr Bardin, Université de Toulon)"),
  // ─── DDF ────────────────────────────────────────────────
  mkAn(24,"DDF","2019","Dissertation","La communauté de vie des époux",["DDF_T1","DDF_T2"],"Mme Douchy-Oudot","(Annale, 2019, Pr Douchy-Oudot, Université de Toulon)"),
  mkAn(25,"DDF","2019","Cas pratique","Cas pratique dirigé : Divorce et filiation",["DDF_T3","DDF_T4"],"Mme Douchy-Oudot","(Annale, 2019, Pr Douchy-Oudot, Université de Toulon)"),
  mkAn(26,"DDF","2019","Cas pratique","Cas pratique : Mariage (formation, conditions, nullité)",["DDF_T1"],"Mme Douchy-Oudot","(Annale, 2019, Pr Douchy-Oudot, Université de Toulon)"),
  mkAn(27,"DDF","2017-18","Cas pratique","Galop d’essai : Cas pratique (mariage et divorce)",["DDF_T1","DDF_T3"],"Mme Douchy-Oudot","(Annale galop d’essai, 2017-18, Pr Douchy-Oudot, Université de Toulon)"),
  mkAn(28,"DDF","2017-18","Commentaire d'arrêt","Fiche d’arrêt + Cas pratique (sujets au choix)",["DDF_T2","DDF_T4"],"Mme Douchy-Oudot","(Annale, 2017-18, Pr Douchy-Oudot, Université de Toulon)"),
  mkAn(29,"DDF","2021-22","Cas pratique","Sujets au choix : Cas pratique (mariage, divorce, PACS)",["DDF_T1","DDF_T3","DDF_T5"],"Mme Douchy-Oudot","(Annale, 2021-22, Pr Douchy-Oudot, Université de Toulon)"),
  mkAn(30,"DDF","2019-20","QCM","QCM (session 2) — Droit de la famille",["DDF_T1","DDF_T2","DDF_T3","DDF_T4","DDF_T5"],"Mme Douchy-Oudot","(Annale session 2, 2019-20, Pr Douchy-Oudot, Université de Toulon)"),
  mkAn(31,"DDF","2022-23","Commentaire d'arrêt","Cass. ch. mixte, 27 février 1970 (arrêt Dangereux — concubinage)",["DDF_T5"],"Mme Douchy-Oudot","(Sujet type examen, cohérent avec le programme Pr Douchy-Oudot, Université de Toulon)",
`ARRÊT À COMMENTER (Cour de cassation, domaine public)

Cour de cassation, chambre mixte, 27 février 1970 (« arrêt Dangereux ») :
« Attendu qu’[...] la cour d’appel a pu décider, sans méconnaître ni les règles de la responsabilité civile ni les droits de la défense, que le préjudice éprouvé par [la concubine, Mme Gaudras] était certain, direct et personnel ; que dès lors la cour d’appel, en condamnant [le responsable de l’accident] à réparer intégralement ce préjudice, a fait une juste application des dispositions de l’art. 1382 du Code civil [aujourd’hui art. 1240]. »

CONSIGNE : Réalisez la fiche d’arrêt de cette décision puis commentez-la en dégageant son apport pour la situation juridique du concubin.`),
  mkAn(32,"DDF","2023-24","Dissertation","La place de la volonté dans le divorce",["DDF_T3","DDF_T4"],"Mme Douchy-Oudot","(Sujet type examen, cohérent avec le programme Pr Douchy-Oudot, Université de Toulon)"),
  mkAn(33,"DDF","2022-23","Commentaire d'article","Article 220 du Code civil (solidarité des époux pour dettes ménagères)",["DDF_T2"],"Mme Douchy-Oudot","(Sujet type examen, cohérent avec le programme Pr Douchy-Oudot, Université de Toulon)",
`ARTICLE À COMMENTER (Code civil, domaine public)

Article 220 du Code civil :
« Chacun des époux a pouvoir pour passer seul les contrats qui ont pour objet l’entretien du ménage ou l’éducation des enfants ; toute dette ainsi contractée par l’un oblige l’autre solidairement.
La solidarité n’a pas lieu, néanmoins, pour les dépenses manifestement excessives, eu égard au train de vie du ménage, à l’utilité ou à l’inutilité de l’opération, à la bonne ou mauvaise foi du tiers contractant.
Elle n’a pas lieu non plus, s’ils n’ont été passés par l’époux qui n’est pas dans l’exercice de la profession, que pour les achats à tempérament ni pour les emprunts à moins que ces derniers ne portent sur des sommes modestes nécessaires aux besoins de la vie courante. »

CONSIGNE : Commentez cet article en analysant son sens, sa portée et la jurisprudence qu’il a engendrée.`),
  mkAn(34,"DDF","2024-25","Fiche d'arrêt","CA Nimes, 14 avril 2020 (fiche d’arrêt)",["DDF_JP"],"Mme Douchy-Oudot","(Sujet TD/examen, Pr Douchy-Oudot, Université de Toulon — voir PDF KB)"),
  mkAn(35,"DDF","2023-24","Dissertation","L’identité du mariage depuis la loi du 17 mai 2013",["DDF_T1","DDF_T2"],"Mme Douchy-Oudot","(Sujet type examen, cohérent avec le programme Pr Douchy-Oudot, Université de Toulon)"),
  mkAn(36,"DDF","2022-23","Dissertation","La prestation compensatoire après divorce",["DDF_T4"],"Mme Douchy-Oudot","(Sujet type examen, cohérent avec le programme Pr Douchy-Oudot, Université de Toulon)"),
  // ─── IA ─────────────────────────────────────────────────
  mkAn(37,"IA","2019","Dissertation","La déconcentration, mode d’organisation de l’État",["IA_2"],"Mr Bardin","(Sujet type examen, cohérent avec le programme Mr Bardin, Université de Toulon)"),
  mkAn(38,"IA","2019","Questions de cours","Organisation administrative de l’État",["IA_1","IA_2"],"Mr Bardin","(Sujet type examen, cohérent avec le programme Mr Bardin, Université de Toulon)"),
  mkAn(39,"IA","2021-22","Dissertation","Le préfet, représentant de l’État dans le département",["IA_2"],"Mr Bardin","(Sujet type examen, cohérent avec le programme Mr Bardin, Université de Toulon)"),
  mkAn(40,"IA","2022-23","Questions de cours","Les collectivités territoriales et leur organisation",["IA_3"],"Mr Bardin","(Sujet type examen, cohérent avec le programme Mr Bardin, Université de Toulon)"),
  mkAn(41,"IA","2023-24","Dissertation","Décentralisation et déconcentration : deux formes d’organisation administrative",["IA_1","IA_2"],"Mr Bardin","(Sujet type examen, cohérent avec le programme Mr Bardin, Université de Toulon)"),
  // ─── HD ─────────────────────────────────────────────────
  mkAn(42,"HD","2019","Dissertation","Les sources du droit sous l’Ancien Régime",["HD_3"],"Mme Regarde-Riot","(Sujet type examen, cohérent avec le programme Mme Regarde-Riot, Université de Toulon)"),
  mkAn(43,"HD","2021","Questions de cours","La justice royale sous l’Ancien Régime",["HD_2"],"Mme Regarde-Riot","(Sujet type examen, cohérent avec le programme Mme Regarde-Riot, Université de Toulon)"),
  mkAn(44,"HD","2022-23","Dissertation","L’ordonnance de Villers-Cotterêts de 1539 et la formation du droit royal",["HD_3"],"Mme Regarde-Riot","(Sujet type examen, cohérent avec le programme Mme Regarde-Riot, Université de Toulon)"),
  mkAn(45,"HD","2023-24","Questions de cours","L’État monarchique sous l’Ancien Régime",["HD_1"],"Mme Regarde-Riot","(Sujet type examen, cohérent avec le programme Mme Regarde-Riot, Université de Toulon)"),
  mkAn(46,"HD","2024-25","Dissertation","La codification napoléonienne et la modernisation du droit français",["HD_4"],"Mme Regarde-Riot","(Sujet type examen, cohérent avec le programme Mme Regarde-Riot, Université de Toulon)"),
];

// ── MÉTHODOLOGIES ────────────────────────────────────────
const METH={
  dissertation:{n:"Dissertation juridique",forMat:["DC","HD","DDF","IA"],v:true,
    structure:"Introduction (accroche→définitions→contexte→intérêt→problématique→plan)\nI. A+B\nII. A+B\nPas de conclusion sauf si temps",
    erreurs:"Pas de problématique = hors sujet\nPlan descriptif\nRécitation sans argumentation\nOubli des références",
    points:"Problématique percutante\nTransitions\nExemples concrets (JP, faits)\nSyllogisme dans chaque sous-partie",
    temps:"Analyse : 15min · Brouillon : 45min · Intro : 20min · Corps : 1h30 · Relecture : 10min",
    syllogisme:"Majeure (règle) → Mineure (application) → Conclusion (déduction)"},
  casPratique:{n:"Cas pratique",forMat:["DDF","DC"],v:true,
    structure:"Faits pertinents (qualifiés)\nProblème de droit\nRègle applicable (textes+JP)\nApplication\nSolution",
    erreurs:"Confondre faits/droit\nOublier qualification\nRépondre sans syllogisme\nCode sans article précis",
    points:"Qualification exacte\nArticles Code civil\nJP pertinente\nSyllogisme rigoureux\nRéponse tranchée",
    temps:"Lecture : 15min · Brouillon : 30min · Rédaction : 1h30 · Relecture : 15min",
    syllogisme:"Art. X dispose que… → En l’espèce, M. X a… → Par conséquent…"},
  commentaireArret:{n:"Commentaire d’arrêt",forMat:["DDF","DC"],v:true,
    structure:"Fiche d’arrêt (faits→procédure→prétentions→question→solution)\nIntro\nI. Sens\nII. Portée",
    erreurs:"Paraphraser ≠ analyser\nPlan I.Faits/II.Droit INTERDIT\nOublier portée\nNe pas situer dans JP",
    points:"Fiche impeccable\nRègle identifiée\nPerspective JP\nAnalyse doctrinale\nPortée future",
    temps:"Fiche : 20min · Plan : 30min · Intro : 15min · Rédaction : 1h20 · Relecture : 15min",
    syllogisme:"La Cour énonce que… → Or, en l’espèce… → Elle en déduit que…"},
  commentaireTexte:{n:"Commentaire de texte",forMat:["DC","DDF"],v:true,
    structure:"Intro (auteur→contexte→thèse→problématique→plan)\nI. Analyse (A+B)\nII. Appréciation critique (A+B)",
    erreurs:"Disserter au lieu de commenter\nNe pas citer le texte\nIgnorer contexte historique\nParaphrase",
    points:"Citations intégrées\nContextualisation\nPerspective constitutionnelle\nAnalyse critique",
    temps:"Analyse : 20min · Plan : 30min · Rédaction : 1h30 · Relecture : 10min",
    syllogisme:"L’auteur affirme que… → S’inscrit dans… → Permet de conclure…"},
  commentaireArticle:{n:"Commentaire d’article",forMat:["DC","DDF"],v:true,
    structure:"Intro (contexte→rédaction→réformes→problématique→plan)\nI. Le sens de l’article (A : sens littéral+systématique / B : jurisprudence associée)\nII. La portée de l’article (A : applications / B : limites et évolutions)",
    erreurs:"Paraphraser le texte\nNégliger la jurisprudence\nOublier les réformes\nNe pas contextualiser",
    points:"Citation exacte avec numéro\nJP liée et datée\nComparaison avant/après réforme\nAnalyse critique",
    temps:"Lecture : 10min · Plan : 25min · Rédaction : 1h35 · Relecture : 10min",
    syllogisme:"L’article dispose que… → Les tribunaux ont interprété que… → Sa portée pratique est donc…"},
  ficheArret:{n:"Fiche d’arrêt",forMat:["DDF","DC"],v:true,
    structure:"1.Juridiction+date 2.Faits 3.Procédure 4.Prétentions 5.Question de droit 6.Solution",
    erreurs:"Faits incomplets\nProcédure mélangée\nQuestion trop large\nOubli du visa",
    points:"Faits qualifiés\nProcédure complète\nQuestion précise\nSolution + raisonnement",
    temps:"10-15 min max",
    syllogisme:"Visa → Attendu que → Or → Décide que"},
  qcm:{n:"QCM / Questions de cours",forMat:["IA","HD","DDF","DC"],v:true,
    structure:"Lire TOUTES propositions · Éliminer fausses · Attention absolus · Distinguer peut/doit",
    erreurs:"Trop vite\nConfondre exception/principe\nDoubles négations\nIgnorer sauf si",
    points:"Connaissances précises\nDistinctions fines\nRéformes récentes",
    temps:"30s-1min par question",
    syllogisme:"Règle → Conditions → Exceptions → Exemples"},
};

// ── QCM BANK ─────────────────────────────────────────────
const QCM_BANK=[
  {id:"q1",m:"DC",th:"DC_S1",q:"Quelle loi constitutionnelle habilite le gouvernement de De Gaulle à rédiger la Constitution de 1958 ?",choices:["Loi constitutionnelle du 3 juin 1958","Loi constitutionnelle du 1er juin 1958","Ordonnance du 13 mai 1958","Loi référendaire du 28 septembre 1958"],a:0,exp:"La loi constitutionnelle du 3 juin 1958 pose 5 principes que doit respecter la nouvelle Constitution (suffrage universel, séparation pouvoirs, responsabilité gouvernementale, indépendance judiciaire, organisation des peuples associés)."},
  {id:"q2",m:"DC",th:"DC_S1",q:"Quel article de la Constitution de 1946 interdisait de réviser par la procédure de l’article 90 ?",choices:["Art. 90","Art. 95","Art. 93","Art. 92"],a:1,exp:"L’art. 95 de la Constitution de 1946 interdisait de réviser la forme républicaine du gouvernement. La loi du 3 juin 1958 dérogea à l’art. 90 (procédure normale de révision)."},
  {id:"q3",m:"DC",th:"DC_S3",q:"Quelle décision du Conseil constitutionnel valide la réforme de 1962 malgré la procédure de l’article 11 ?",choices:["Décision 62-18 L","Décision 62-20 DC du 6 novembre 1962","Décision 71-44 DC","Décision 75-54 DC"],a:1,exp:"CC 62-20 DC 6 nov. 1962 : le CC se déclare incompétent pour contrôler les lois adoptées par référendum, car elles sont l’expression directe de la souveraineté nationale."},
  {id:"q4",m:"DC",th:"DC_S4",q:"Combien de cohabitations la Ve République a-t-elle connues ?",choices:["1","2","3","4"],a:2,exp:"3 cohabitations : 1986-88 (Mitterrand/Chirac), 1993-95 (Mitterrand/Balladur), 1997-2002 (Chirac/Jospin)."},
  {id:"q5",m:"DC",th:"DC_S5",q:"Quelle révision constitutionnelle a institué le quinquennat présidentiel ?",choices:["Révision du 18 juin 2000","Révision du 23 juillet 2008","Révision du 28 septembre 1962","Révision du 4 août 1995"],a:0,exp:"La révision du 18 juin 2000 (par référendum) a modifié l’art. 6 pour passer de 7 à 5 ans le mandat présidentiel."},
  {id:"q6",m:"DC",th:"DC_S7",q:"Quel article de la Constitution prévoit la motion de censure spontanée ?",choices:["Art. 49 al. 1","Art. 49 al. 2","Art. 49 al. 3","Art. 50"],a:1,exp:"Art. 49 al. 2 : l’Assemblée nationale peut prendre l’initiative de mettre en cause la responsabilité du gouvernement par une motion de censure signée par 1/10 des membres."},
  {id:"q7",m:"DC",th:"DC_S8",q:"Quelle décision du Conseil constitutionnel a dégagé le concept de ‘bloc de constitutionnalité’ ?",choices:["CC 71-44 DC du 16 juillet 1971","CC 62-20 DC du 6 novembre 1962","CC 74-54 DC du 15 janvier 1975","CC 82-143 DC du 30 juillet 1982"],a:0,exp:"CC 71-44 DC 16 juil. 1971 (liberté d’association) : le CC intègre le Préambule de 1946 et la DDHC de 1789 dans le bloc de constitutionnalité."},
  {id:"q8",m:"DC",th:"DC_S10",q:"À partir de quelle révision les parlementaires peuvent-ils saisir le Conseil constitutionnel ?",choices:["Révision de 1962","Révision de 1971","Révision de 1974","Révision de 2008"],a:2,exp:"La révision constitutionnelle de 1974 ouvre la saisine du CC à 60 députés ou 60 sénateurs."},
  {id:"q9",m:"DC",th:"DC_S10",q:"La QPC est entrée en vigueur en…",choices:["2008","2009","2010","2012"],a:2,exp:"Créée par la révision du 23 juillet 2008 (art. 61-1), la QPC est entrée en vigueur le 1er mars 2010."},
  {id:"q10",m:"DC",th:"DC_NORM",q:"Quel article fixe la supériorité des traités sur les lois ?",choices:["Art. 54","Art. 55","Art. 56","Art. 61"],a:1,exp:"Art. 55 : les traités régulièrement ratifiés ont une autorité supérieure à celle des lois, sous réserve de réciprocité."},
  {id:"q11",m:"DDF",th:"DDF_T1",q:"Depuis quelle loi le mariage est-il ouvert aux couples de même sexe en France ?",choices:["Loi du 13 mai 2012","Loi du 17 mai 2013","Loi du 1er juin 2014","Loi du 15 novembre 1999"],a:1,exp:"La loi du 17 mai 2013 (mariage pour tous) a modifié l’art. 143 CC."},
  {id:"q12",m:"DDF",th:"DDF_T1",q:"Quel est l’âge minimum légal pour se marier en France (depuis 2006) ?",choices:["15 ans","16 ans","18 ans","21 ans"],a:2,exp:"Depuis la loi du 4 avril 2006, l’art. 144 CC fixe l’âge minimal à 18 ans."},
  {id:"q13",m:"DDF",th:"DDF_T1",q:"Quelle est la sanction d’un mariage contracté en état de bigamie ?",choices:["Nullité relative","Nullité absolue","Inopposabilité","Divorce automatique"],a:1,exp:"Art. 184 CC : le mariage contracté en violation de l’art. 147 (bigamie) est frappé de nullité absolue."},
  {id:"q14",m:"DDF",th:"DDF_T2",q:"Quel article du Code civil pose le devoir de communauté de vie entre époux ?",choices:["Art. 212","Art. 213","Art. 215","Art. 220"],a:2,exp:"Art. 215 al. 1 : ‘Les époux s’obligent mutuellement à une communauté de vie.’ Al. 3 protège le logement familial."},
  {id:"q15",m:"DDF",th:"DDF_T2",q:"Quel article organise la solidarité des époux pour les dettes ménagères ?",choices:["Art. 214","Art. 215","Art. 220","Art. 221"],a:2,exp:"Art. 220 CC : chaque époux a pouvoir pour passer seul les contrats d’entretien du ménage."},
  {id:"q16",m:"DDF",th:"DDF_T3",q:"La loi du 23 mars 2019 a supprimé quelle étape dans la procédure de divorce ?",choices:["L’assignation","L’ordonnance de non-conciliation (ONC)","La médiation","L’audience de jugement"],a:1,exp:"Le décret du 17 décembre 2020 (entré en vigueur le 1er janv. 2021) a supprimé l’ONC."},
  {id:"q17",m:"DDF",th:"DDF_T3",q:"Quel est le délai de séparation requis pour l’altération définitive du lien conjugal (depuis 2019) ?",choices:["6 mois","1 an","2 ans","3 ans"],a:1,exp:"Art. 238 CC (réforme 2019) : le délai est passé de 2 ans à 1 an de séparation de fait."},
  {id:"q18",m:"DDF",th:"DDF_T4",q:"Comment s’appelle l’indemnité versée après divorce pour compenser une disparité de niveau de vie ?",choices:["Pension alimentaire","Prestation compensatoire","Indemnité d’occupation","Contribution aux charges"],a:1,exp:"Art. 270 CC : la prestation compensatoire est destinée à compenser la disparité créée par la rupture du mariage."},
  {id:"q19",m:"DDF",th:"DDF_T5",q:"Quel arrêt de 1970 a admis le préjudice par ricochet du concubin ?",choices:["Cass. ch. mixte 27 fév. 1970 ‘Dangereux’","Cass. 1re civ. 19 déc. 2018","Cass. com. 22 fév. 2005","SECHER c/ Air-France"],a:0,exp:"Cass. ch. mixte 27 fév. 1970 ‘Dangereux’ : revirement historique admettant le préjudice par ricochet du concubin."},
  {id:"q20",m:"DDF",th:"DDF_T5",q:"Le PACS est régi par quels articles du Code civil ?",choices:["Art. 144 à 162","Art. 515-1 à 515-7","Art. 229 à 232","Art. 270 à 285"],a:1,exp:"Art. 515-1 à 515-7 CC (loi du 15 novembre 1999, réformés en 2006)."},
  {id:"q21",m:"IA",th:"IA_1",q:"Qui représente l’État dans le département ?",choices:["Le maire","Le préfet","Le président du Conseil départemental","Le sous-préfet"],a:1,exp:"Le préfet, nommé en Conseil des ministres, est le représentant de l’État dans le département (décret du 29 avril 2004)."},
  {id:"q22",m:"IA",th:"IA_1",q:"Quelle est la juridiction suprême de l’ordre administratif ?",choices:["La Cour de cassation","Le Tribunal des conflits","Le Conseil d’État","La Cour administrative d’appel"],a:2,exp:"Le Conseil d’État est la juridiction administrative suprême (art. L. 111-1 CJA)."},
  {id:"q23",m:"IA",th:"IA_2",q:"Quel principe consiste à rapprocher les centres de décision des administrés en maintenant l’unité de l’État ?",choices:["Décentralisation","Déconcentration","Délégation de service public","Subsidiarité"],a:1,exp:"La déconcentration transfère des pouvoirs de décision à des agents locaux de l’État (préfets, recteurs) qui restent sous l’autorité hiérarchique du gouvernement."},
  {id:"q24",m:"HD",th:"HD_1",q:"Quelle ordonnance de 1539 a imposé le français comme langue des actes judiciaires ?",choices:["Ordonnance de Blois 1499","Ordonnance de Villers-Cotterêts 1539","Ordonnance de Moulins 1566","Ordonnance de Saint-Maur 1670"],a:1,exp:"L’ordonnance de Villers-Cotterêts (août 1539), signée par François Ier, impose le français dans tous les actes judiciaires et notariés."},
  {id:"q25",m:"HD",th:"HD_2",q:"Comment appelle-t-on la procédure par laquelle le roi venait imposer l’enregistrement d’un texte au Parlement ?",choices:["Remontrances","Lit de justice","Évocation royale","Lettres de cachet"],a:1,exp:"Le lit de justice est la séance solennelle tenue en présence du roi pour imposer l’enregistrement d’un édit, symbole de l’absolutisme royal."},
  {id:"q26",m:"HD",th:"HD_3",q:"La France se divisait sous l’Ancien Régime entre pays de coutume (Nord) et pays de…",choices:["Droit canon","Droit romain (droit écrit)","Droit coutumier renforcé","Droit germanique"],a:1,exp:"La France était divisée entre pays de coutume (nord de la Loire) et pays de droit écrit ou de droit romain (sud)."},
  {id:"q27",m:"HD",th:"HD_2",q:"Que sont les ‘remontrances’ sous l’Ancien Régime ?",choices:["Des arrêts du Parlement","Des objections du Parlement à l’enregistrement d’une ordonnance royale","Des lettres du roi ordonnant l’emprisonnement","Des chartes octroyées par le roi"],a:1,exp:"Les remontrances sont les objections formulées par les parlements (cours souveraines) lors de l’enregistrement des ordonnances royales."},
  {id:"q28",m:"HD",th:"HD_3",q:"Qui est l’auteur des ‘Les six livres de la République’ (1576) définissant la souveraineté ?",choices:["Charles Loyseau","Jean Bodin","Pothier","Domat"],a:1,exp:"Jean Bodin (1530-1596) définit la souveraineté comme ‘la puissance absolue et perpétuelle d’une République’ dans ses Six livres de la République (1576)."},
  {id:"q29",m:"IA",th:"IA_2",q:"Quel texte régit la fonction de préfet depuis la Réforme de 2004 ?",choices:["Loi du 28 pluvioôse an VIII","Décret n° 2004-374 du 29 avril 2004","Loi du 2 mars 1982","Ordonnance du 7 janvier 1959"],a:1,exp:"Le décret n° 2004-374 du 29 avril 2004 régit le rôle du préfet, représentant de l’État dans le département et la région."},
];

// ── COURSE CONTEXT ───────────────────────────────────────
const COURSE_CTX={
  DC_S1:"Loi constitutionnelle 3 juin 1958 : dérogation art.90, 5 principes (suffrage universel, séparation pouvoirs, responsabilité gouv devant Parlement, indépendance judiciaire, rapports peuples associés). Art.90 Constitution 1946 : procédure révision stricte. Art.95 : interdiction réviser forme républicaine. Discours Debré 27 août 1958. Discours De Gaulle 1er juin 1958. Manuels : Favoreu, Gicquel, Bourdon.",
  DC_S2:"Discours de Bayeux 16 juin 1946 (De Gaulle) : conception arbitrage présidentiel. Luchaire 'Introduction' Constitution République française 1987. Blum Le Populaire 21 juin 1946. Discours d'Épinal 29 sept 1946. Compromis parlementarisme/présidentialisme.",
  DC_S3:"Réforme 1962 : élection président suffrage universel direct. Art.11 vs art.89. Crise constitutionnelle 1962. Présidentialisme majoritaire. Art.12 : dissolution. Art.49 al.3. Décision CC 62-20 DC 6 nov 1962.",
  DC_S4:"Cohabitation : discordance majorités. 3 cohabitations : 1986-88 (Mitterrand/Chirac), 1993-95 (Mitterrand/Balladur), 1997-2002 (Chirac/Jospin). Message Mitterrand 8 avril 1986. Art.5, 8, 20, 21 Constitution.",
  DC_S5:"Quinquennat 2000 (révision art.6). Inversion calendrier 2001. Présidentialisme renouvelé post-2002. Révision 23 juillet 2008 : limitation 2 mandats, art.49-3 limité. Art.61-1 : QPC.",
  DC_S7:"Art.24 : Parlement=vote loi+contrôle gouvernement. Art.49 : motion censure. Art.50 : démission. Art.34/37 : domaine loi/règlement. Rationalisation parlementarisme : art.40, art.44, art.45.",
  DC_S8:"Art.34 : domaine de la loi. Art.37 : domaine réglementaire. Art.38 : ordonnances. Art.44 : droit amendement, vote bloqué. Art.45 : navette, CMP. Décision CC 71-44 DC 16 juil 1971.",
  DC_S10:"Art.56-63 Constitution. Composition CC : 9 membres nommés. Contrôle a priori : art.61. QPC : art.61-1 (révision 2008, entrée vigueur 2010). Bloc constitutionnalité. Décision 71-44 DC. Réforme 1974.",
  DC_INTRO:"Constitution 1958 : rupture avec IIIè et IVè Républiques. Régime parlementaire rationalisé à tendance présidentielle. Ambiguïté Constitution. Plan cours Bardin.",
  DC_P1:"Titre 1 : Origines Constitution 1958. Crise 13 mai 1958, recours à De Gaulle. Loi constitutionnelle 3 juin 1958. Référendum 28 sept 1958. Sources : idées De Gaulle (Bayeux) + apport Debré.",
  DC_P2:"Titre 2-3 : Institutions. Président : art.5-19. Gouvernement : art.20-23. Parlement : art.24-51. CC : art.56-63. Évolution : 1962, cohabitations, quinquennat, révision 2008.",
  DC_NORM:"Séminaire normes constitutionnelles. Hiérarchie normes : Constitution > traités (art.55) > lois > règlements. Bloc constitutionnalité. Art.54. Art.55. QPC.",
  DC_DATES:"Dates clés : 1958, 1962, 1971, 1974, 1975, 1982, 2000, 2008, 2010.",
  DDF_T1:"MARIAGE FORMATION. Art.143 CC : mariage pour tous (loi 17 mai 2013). Conditions fond : consentement (art.146), âge 18 ans (art.144), monogamie (art.147), prohibition inceste (art.161-163). Nullité : absolue (art.184) vs relative (art.180).",
  DDF_T2:"MARIAGE EFFETS. Art.212 : devoirs mutuels. Art.215 : communauté de vie, logement familial protégé. Art.220 : solidarité dettes ménagères. Art.221 : autonomie bancaire.",
  DDF_T3:"DIVORCE FONDEMENT. 4 cas : consentement mutuel extrajudiciaire (art.229-1), accepté (art.233), altération définitive 1 an (art.237-238, réforme 2019), faute (art.242). Procédure : assignation directe (décret 17 déc 2020, suppression ONC).",
  DDF_T4:"DIVORCE EFFETS. Prestation compensatoire : art.270-281 CC (disparité conditions vie, capital ou rente). Pension alimentaire enfants : art.371-2. Liquidation régime matrimonial.",
  DDF_T5:"CONCUBINAGE : art.515-8 CC. Revirement : Cass. ch. mixte 27 fév 1970 (préjudice par ricochet). PACS : art.515-1 à 515-7 CC (loi 15 nov 1999, réforme 2006). Art.515-4 : aide matérielle + assistance.",
  DDF_CM:"Plan cours Douchy-Oudot : Thème 1 Mariage. Thème 2 Divorce. Thème 3 PACS et concubinage. Méthode : fiche d'arrêt, cas pratique, commentaire d'arrêt.",
  IA_1:"Administration centrale État : Président (art.5,13,15), PM (art.21), ministres. AAI. Conseil État : juridiction suprême administrative + conseiller gouvernement.",
  IA_2:"Administration déconcentrée : préfet (représentant État dans département, décret 2004-374). Déconcentration vs décentralisation.",
  HD_1:"État Ancien Régime : monarchie absolue, roi source de justice et de loi. Jean Bodin (souveraineté 1576). Ordonnances royales. Lois fondamentales du royaume.",
  HD_2:"Justice Ancien Régime : justice royale (parlements, bailliages), justice seigneuriale, justice ecclésiastique. Parlement de Paris : enregistrement ordonnances + remontrances. Lit de justice.",
  HD_3:"Sources droit Ancien Régime : coutumes (pays de coutume au Nord), droit romain (pays de droit écrit au Sud). Ordonnances royales (Villers-Cotterêts 1539). Doctrine : Domat, Pothier.",
};

// ── SM-2 ─────────────────────────────────────────────────
function sm2(quality,card){
  const ef=Math.max(1.3,(card.ef||2.5)+(0.1-(5-quality)*(0.08+(5-quality)*0.02)));
  if(quality<3)return{...card,ef,interval:1,reps:0,next:new Date().toISOString()};
  const reps=(card.reps||0)+1;
  const interval=reps===1?1:reps===2?6:Math.round((card.interval||1)*ef);
  const next=new Date(Date.now()+interval*864e5).toISOString();
  return{...card,ef,interval,reps,next};
}

// ══════════════════════════════════════════════════════
// MOTEUR IA MULTI-MODÈLE
// ══════════════════════════════════════════════════════
const HF_TOKEN=process.env.REACT_APP_HF_TOKEN||"";
const HF_MODEL="mistralai/Mistral-7B-Instruct-v0.3";

function getApiKeys(){return{gemini:localStorage.getItem("ak_gemini")||process.env.REACT_APP_GEMINI_KEY||"",groq:localStorage.getItem("ak_groq")||process.env.REACT_APP_GROQ_KEY||""};}

async function callGemini(sys,msg,webSearch=false){
  const{gemini:key}=getApiKeys();if(!key)throw new Error("Clé Gemini manquante");
  const body={system_instruction:{parts:[{text:sys}]},contents:[{role:"user",parts:[{text:msg}]}],generationConfig:{maxOutputTokens:8192,temperature:0.2}};
  if(webSearch)body.tools=[{google_search:{}}];
  const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  if(!res.ok){const e=await res.json();throw new Error(e.error?.message||`Gemini ${res.status}`);}
  const d=await res.json();
  const text=d.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("").trim();
  if(!text)throw new Error("Gemini: réponse vide");return text;
}

async function callGroq(sys,msg){
  const{groq:key}=getApiKeys();if(!key)throw new Error("Clé Groq manquante");
  const res=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:sys},{role:"user",content:msg}],max_tokens:4096,temperature:0.2})});
  if(!res.ok){const e=await res.json();throw new Error(e.error?.message||`Groq ${res.status}`);}
  const d=await res.json();const text=d.choices?.[0]?.message?.content?.trim();if(!text)throw new Error("Groq: réponse vide");return text;
}

async function callHF(sys,msg){
  const prompt=`<s>[INST] ${sys}\n\n${msg} [/INST]`;
  const doFetch=()=>fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`,{method:"POST",headers:{"Authorization":`Bearer ${HF_TOKEN}`,"Content-Type":"application/json"},body:JSON.stringify({inputs:prompt,parameters:{max_new_tokens:2048,temperature:0.65,repetition_penalty:1.1,return_full_text:false}})});
  let res=await doFetch();
  if(res.status===503){const d=await res.json();await new Promise(r=>setTimeout(r,Math.min((d.estimated_time||20)*1000,30000)));res=await doFetch();}
  if(!res.ok)throw new Error(`HF ${res.status}`);
  const data=await res.json();
  if(Array.isArray(data)&&data[0]){const txt=data[0].generated_text||"";return(txt.split("[/INST]").pop()||txt).trim();}
  if(data.generated_text)return data.generated_text.trim();
  if(data.error)throw new Error(data.error);throw new Error("HF: format inattendu");
}

function mockAI(type,mat,extra){
  const m=M[mat]||M.DC;
  const guide=`\n\n━━ CONFIGURER L’IA (gratuit, 2 min) ━━\n▸ Gemini 2.0 Flash : aistudio.google.com\n▸ Groq Llama-3.3-70B : console.groq.com\nColle ta clé dans ⚙️ Paramètres`;
  if(type==="fiche")return`📋 FICHE HORS-LIGNE — ${extra}\n\nAucune clé API configurée.${guide}`;
  if(type==="sujet")return`SUJET HORS-LIGNE — ${m.full}\n\nAucune clé API. Les sujets IA nécessitent une clé Gemini ou Groq.${guide}`;
  if(type==="correction")return`🎓 CORRECTION HORS-LIGNE — ${m.full}\n\nAucune clé API configurée.${guide}`;
  if(type==="flashcards")return JSON.stringify([{q:"⚠ IA non configurée",a:"Configure une clé Gemini (aistudio.google.com) ou Groq (console.groq.com) dans ⚙️ Paramètres."}]);
  return`⚠ Mode hors-ligne.${guide}`;
}

async function callAI(sys,msg,type,mat,extra,webSearch=false){
  const errors=[];
  try{return await callGemini(sys,msg,webSearch);}catch(e){errors.push(`Gemini: ${e.message}`);}
  try{return await callGroq(sys,msg);}catch(e){errors.push(`Groq: ${e.message}`);}
  try{return await callHF(sys,msg);}catch(e){errors.push(`HF: ${e.message}`);}
  console.warn("Tous modèles échoués:",errors.join(" | "));
  return mockAI(type||"fiche",mat||"DC",extra||"");
}

const aiSys=(mat,themeId)=>{
  const ctx=themeId&&COURSE_CTX[themeId]?`\n\n═══ CONTENU RÉEL DU COURS ═══\n${COURSE_CTX[themeId]}\n═════════════════════════`:"";
  const allCtx=mat&&Object.entries(COURSE_CTX).filter(([k])=>k.startsWith(mat+"_")).map(([,v])=>v).join(" | ");
  const methCtx=mat==="DDF"?"\nMÉTHODOG DDF (Douchy-Oudot): CAS PRATIQUE = faits qualifiés → problème de droit → art. Code civil EXACT → application → solution tranchée. SYLLOGISME OBLIGATOIRE: ‘Art. X CC dispose que... → En l’espèce... → Par conséquent...’"
    :mat==="DC"?"\nMÉTHODO DC (Bardin): DISSERTATION = accroche→définitions EXACTES→contexte historique→intérêt→problématique interrogative→plan en 2 parties. EXIGE: articles de la Constitution cités avec numéro EXACT, arrêts CC avec date et numéro."
    :mat==="IA"?"\nMÉTHODO IA (Bardin): réponses structurées, vocabulaire administratif précis."
    :"\nMÉTHODO HD (Regarde-Riot): précision historique, sources primaires.";
  const broadCtx=!themeId&&allCtx?`\n\nCONTEXTE GLOBAL:\n${allCtx.slice(0,800)}`:"";
  return`Tu es ${M[mat]?.prof||"un professeur de droit"}, professeur à l’Université de Toulon, spécialiste de ${M[mat]?.full||mat}. Tu corriges des copies d’étudiants L1 S2.\n\nRÈGLES ABSOLUES:\n1. Base TOUTES tes réponses sur le contenu RÉEL du cours ci-dessous\n2. Cite les articles avec leur numéro EXACT (art. 49 al. 2, art. 143 CC, etc.)\n3. Cite les arrêts avec juridiction + date + numéro\n4. Pour une CORRECTION: note sur 20 JUSTIFIÉE + erreurs PRÉCISES\n5. Sois exigeant comme un vrai professeur universitaire${methCtx}${ctx}${broadCtx}`;
};

// Prompt spécifique par type d’exercice
function buildExoPrompt(exoType,exoMat,matCtx){
  const prof=M[exoMat]?.prof||"le professeur";
  const mat=M[exoMat]?.full||exoMat;
  const base=`Génère un sujet d’examen pour ${mat} (L1 Université de Toulon, ${prof}).\nBasé sur le cours réel : ${matCtx.slice(0,600)}\nStyle fidèle aux sujets réels de ${prof}.\n`;
  switch(exoType){
    case"Dissertation":return base+`Génère UNE dissertation. Format : intitulé seul (question ouverte ou nominale, 1 phrase). UNIQUEMENT l’intitulé, pas de corrigé.`;
    case"Cas pratique":return base+`Génère UN cas pratique complet : situation factuelle détaillée (3-5 personnages, faits, dates précises) + 3-4 questions juridiques numérotées. Durée attendue : 3h. Pas de corrigé.`;
    case"Commentaire d'arrêt":return base+`Génère UN commentaire d’arrêt : 1) Reproduis un arrêt RÉEL du cours (juridiction, date, attendus). 2) Consigne de commentaire. Utilise uniquement des arrêts réels du cours. Pas de corrigé.`;
    case"Commentaire de texte":return base+`Génère UN commentaire de texte : 1) Texte réel (discours, doctrine, article). 2) Consigne de commentaire. Pas de corrigé.`;
    case"Commentaire d'article":return base+`Génère UN commentaire d’article : 1) Article de loi ou de la Constitution réel du cours. 2) Consigne de commentaire. Pas de corrigé.`;
    case"Fiche d'arrêt":return base+`Génère UN exercice de fiche d’arrêt : reproduis un arrêt RÉEL (~150 mots, juridiction, date, attendus). Consigne : "Réalisez la fiche d’arrêt." Pas de corrigé.`;
    case"Questions de cours":return base+`Génère 6 à 8 questions de cours numérotées, précises, anchées dans le programme. Pas de réponses.`;
    case"QCM":return base+`Génère EXACTEMENT 10 questions QCM.\nFORMAT OBLIGATOIRE pour chaque question :\nQ1. [Question ?]\nA) ... B) ... C) ... D) ...\nRéponse : [lettre] — [explication 1-2 phrases avec référence exacte]\nGénère les 10 questions Q1 à Q10.`;
    default:return base+`Génère un sujet "${exoType}". UNIQUEMENT l’énoncé, pas de corrigé.`;
  }
}

// ── STORAGE ──────────────────────────────────────────────
const defState=()=>({v:V,mastery:{},notes:{},examDates:{DC:"",DDF:"",IA:"",HD:""},history:[],flashcards:{},inProgress:[],settings:{dark:true},lastSaved:null,created:new Date().toISOString()});

function loadState(){
  try{
    let raw=localStorage.getItem(SK);
    if(!raw)raw=localStorage.getItem("l1s2_v11");
    if(!raw)raw=localStorage.getItem("l1s2_v10");
    if(!raw)return defState();
    const d=JSON.parse(raw);
    if(d.v<V)return migrate(d);
    return{...defState(),...d,settings:{...defState().settings,...(d.settings||{})}};
  }catch{return defState();}
}
function migrate(d){
  const s={...defState(),...d,v:V};
  if(d.mastery)s.mastery={...s.mastery,...d.mastery};
  if(d.themes)Object.entries(d.themes).forEach(([k,v])=>{s.mastery[k]={level:v.m||0,lr:v.lr||null,count:v.rc||0};});
  s.settings={...defState().settings,...(d.settings||{})};
  s.inProgress=d.inProgress||[];
  return s;
}
function saveLS(s){try{localStorage.setItem(SK,JSON.stringify({...s,lastSaved:new Date().toISOString()}));return true;}catch{return false;}}

// ══════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════
export default function App(){
  const[S,setS]=useState(loadState);
  const[view,setView]=useState("dash");
  const[sel,setSel]=useState(null);
  const[sel2,setSel2]=useState(null);
  const[saveOk,setSaveOk]=useState(true);
  const[aiLoading,setAiLoading]=useState(false);
  const[aiOut,setAiOut]=useState("");
  const[exoMat,setExoMat]=useState("DC");
  const[exoType,setExoType]=useState("");
  const[exoSubject,setExoSubject]=useState("");
  const[exoStep,setExoStep]=useState("choose");
  const[exoAnswer,setExoAnswer]=useState("");
  const[activeInProgId,setActiveInProgId]=useState(null);
  const[timer,setTimer]=useState(null);
  const[fcTheme,setFcTheme]=useState(null);
  const[fcIdx,setFcIdx]=useState(0);
  const[fcFlip,setFcFlip]=useState(false);
  const[methSel,setMethSel]=useState(null);
  const[kbFilter,setKbFilter]=useState("all");
  const[kbType,setKbType]=useState("all");
  const[annFilter,setAnnFilter]=useState("all");
  const[histSel,setHistSel]=useState(null);
  const[qcmMat,setQcmMat]=useState("all");
  const[qcmIdx,setQcmIdx]=useState(0);
  const[qcmAns,setQcmAns]=useState(null);
  const[qcmScore,setQcmScore]=useState({right:0,wrong:0});
  const[qcmDeck,setQcmDeck]=useState([]);
  const[qcmDone,setQcmDone]=useState(false);
  const[showKeys,setShowKeys]=useState(false);
  const[keyGemini,setKeyGemini]=useState(()=>localStorage.getItem("ak_gemini")||"");
  const[keyGroq,setKeyGroq]=useState(()=>localStorage.getItem("ak_groq")||"");
  // KB Chat
  const[kbChatMat,setKbChatMat]=useState("DC");
  const[kbChatMsgs,setKbChatMsgs]=useState([]);
  const[kbChatInput,setKbChatInput]=useState("");
  const[kbChatLoading,setKbChatLoading]=useState(false);
  // Deep Research
  const[drMat,setDrMat]=useState("DC");
  const[drMsgs,setDrMsgs]=useState([]);
  const[drInput,setDrInput]=useState("");
  const[drLoading,setDrLoading]=useState(false);

  const saveRef=useRef(null);
  const timerRef=useRef(null);
  const inProgRef=useRef(null);

  const dark=S.settings?.dark!==false;
  const P=dark?DARK:LIGHT;

  const persist=useCallback((ns)=>{setS(ns);clearTimeout(saveRef.current);saveRef.current=setTimeout(()=>setSaveOk(saveLS(ns)),500);},[]);

  // Timer
  useEffect(()=>{
    if(timer?.active){timerRef.current=setInterval(()=>{setTimer(t=>{if(!t||t.remaining<=0){clearInterval(timerRef.current);return{...t,active:false};}return{...t,remaining:t.remaining-1};});},1000);}
    return()=>clearInterval(timerRef.current);
  },[timer?.active]);

  // Auto-save in-progress exercise
  useEffect(()=>{
    if(exoStep!=="write"||!exoSubject)return;
    clearTimeout(inProgRef.current);
    inProgRef.current=setTimeout(()=>{
      const now=new Date().toISOString();
      setS(prev=>{
        let newInProg;
        if(activeInProgId){
          newInProg=(prev.inProgress||[]).map(ex=>ex.id===activeInProgId?{...ex,answer:exoAnswer,subject:exoSubject,updatedAt:now}:ex);
        }else{
          const newId=Date.now();
          setActiveInProgId(newId);
          newInProg=[...(prev.inProgress||[]),{id:newId,mat:exoMat,type:exoType,subject:exoSubject,answer:exoAnswer,status:"in_progress",startedAt:now,updatedAt:now}];
        }
        const ns={...prev,inProgress:newInProg};
        saveLS(ns);return ns;
      });
    },1500);
    return()=>clearTimeout(inProgRef.current);
  },[exoAnswer,exoSubject,exoStep]);

  // Helpers
  const mst=(tid)=>S.mastery[tid]?.level||0;
  const setMst=(tid,lvl)=>{const o=S.mastery[tid]||{level:0,lr:null,count:0};persist({...S,mastery:{...S.mastery,[tid]:{level:lvl,lr:new Date().toISOString(),count:(o.count||0)+1}}});};
  const setNote=(tid,txt)=>persist({...S,notes:{...S.notes,[tid]:txt}});
  const addHist=(e)=>persist({...S,history:[...S.history,{id:Date.now(),ts:new Date().toISOString(),...e}]});
  const removeInProg=(id)=>persist({...S,inProgress:(S.inProgress||[]).filter(x=>x.id!==id)});
  const themesByMat=(mid)=>T.filter(t=>t.m===mid);
  const mLbl=["Jamais vu","Vu","Compris","Rédigé","Maîtrisé"];
  const mClr=["#8A5560","#9F4E4E","#d4a040","#c4a83a","#2E7D5A"];
  const fmtTime=(s)=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  const doAI=async(sys,msg,type,mat,extra,webSearch=false)=>{
    const{gemini,groq}=getApiKeys();
    const lbl=gemini?"Gemini 2.0 Flash":groq?"Groq Llama-3.3-70B":"HuggingFace";
    setAiLoading(true);setAiOut(`⏳ ${lbl} en cours${webSearch?" (+ recherche web)":""}...`);
    const r=await callAI(sys,msg,type,mat,extra,webSearch);
    setAiOut(r);setAiLoading(false);return r;
  };

  // Extract grade from AI correction and update mastery
  const updateMasteryFromCorrection=(mat,feedback)=>{
    const match=feedback.match(/NOTE[:\s]*(\d+(?:[.,]\d+)?)\s*\/\s*20/i);
    if(!match)return;
    const grade=parseFloat(match[1].replace(",","."));
    const lvl=grade>=16?4:grade>=12?3:grade>=8?2:grade>=5?1:0;
    const themes=T.filter(t=>t.m===mat);
    if(themes.length>0){
      const updates={};
      themes.slice(0,2).forEach(t=>{const cur=mst(t.id);if(lvl>cur||lvl<cur)updates[t.id]={level:lvl,lr:new Date().toISOString(),count:(S.mastery[t.id]?.count||0)+1};});
      if(Object.keys(updates).length>0)persist({...S,mastery:{...S.mastery,...updates}});
    }
  };

  const priority=useMemo(()=>T.map(t=>{
    const ects=M[t.m].ects,m=mst(t.id),ed=S.examDates[t.m];
    let prox=0.5;
    if(ed){const d=(new Date(ed)-Date.now())/864e5;prox=d<=0?1:d>60?0.2:1-(d/60)*0.8;}
    return{...t,score:ects*prox*(1-m/4)*(t.v?1.2:0.8),mast:m};
  }).sort((a,b)=>b.score-a.score),[S.mastery,S.examDates]);

  const stats=useMemo(()=>{
    const n=T.length,v=T.filter(t=>t.v).length,m3=T.filter(t=>mst(t.id)>=3).length;
    return{n,v,m3,m0:T.filter(t=>mst(t.id)===0).length,avg:T.reduce((s,t)=>s+mst(t.id),0)/n,studying:n-m3-T.filter(t=>mst(t.id)===0).length};
  },[S.mastery]);

  const exportData=()=>{const b=new Blob([JSON.stringify(S,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=`L1S2_v12_${new Date().toISOString().slice(0,10)}.json`;a.click();};
  const importData=()=>{const inp=document.createElement("input");inp.type="file";inp.accept=".json";inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{const d=JSON.parse(ev.target.result);persist(d.v<V?migrate(d):{...defState(),...d});setView("dash");}catch(err){alert("Erreur: "+err.message);}};r.readAsText(f);};inp.click();};
  const resetAll=()=>{if(!window.confirm("SUPPRIMER toutes les données ?"))return;if(!window.confirm("DERNIÈRE CONFIRMATION — tout sera perdu."))return;localStorage.removeItem(SK);setS(defState());setView("dash");setSel(null);setSel2(null);};

  // ── STYLES APPLE-LIKE ──────────────────────────────────
  const font="'Segoe UI',system-ui,-apple-system,sans-serif";
  const card={background:P.sf,border:`1px solid ${P.bdr}`,borderRadius:18,padding:18,marginBottom:12,boxShadow:dark?"0 2px 12px rgba(0,0,0,0.25)":"0 2px 12px rgba(198,92,105,0.08)",transition:"all .2s ease"};
  const btn={background:P.pri,color:"#fff",border:"none",borderRadius:12,padding:"9px 18px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:font,transition:"all .15s ease",boxShadow:`0 2px 8px ${P.pri}44`};
  const btnS={background:dark?P.sf2:P.sf,color:P.tx2,border:`1px solid ${P.bdr}`,borderRadius:10,padding:"6px 13px",cursor:"pointer",fontSize:11,fontFamily:font,transition:"all .15s ease"};
  const btnG={background:"transparent",color:P.tx2,border:"none",padding:"4px 8px",cursor:"pointer",fontSize:11,fontFamily:font};
  const inp={background:dark?P.sf2:"#fff",color:P.tx,border:`1px solid ${P.bdr}`,borderRadius:10,padding:"8px 12px",fontSize:12,fontFamily:font,width:"100%"};
  const ta={...inp,minHeight:160,resize:"vertical",lineHeight:1.7};
  const badge=(bg,c)=>({display:"inline-block",background:bg,color:c||"#fff",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:8,letterSpacing:0.3,textTransform:"uppercase",marginRight:4});
  const tag={display:"inline-block",background:dark?P.sf2:P.accS,color:P.tx2,fontSize:10,padding:"2px 7px",borderRadius:6,marginRight:4,marginBottom:2};

  // ── COMPONENTS ─────────────────────────────────────────
  const NavItem=({icon,label,active,onClick,color,count})=>(
    <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",cursor:"pointer",fontSize:12,fontWeight:active?700:400,
      color:active?(dark?"#fff":P.priS):P.tx2,background:active?`${color||P.pri}22`:"transparent",
      borderLeft:active?`3px solid ${color||P.pri}`:"3px solid transparent",transition:"all .15s",borderRadius:"0 10px 10px 0"}}>
      <span style={{fontSize:14}}>{icon}</span>
      <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{label}</span>
      {count!=null&&<span style={{...badge(active?color||P.pri:P.bdr,active?"#fff":P.tx3),fontSize:8}}>{count}</span>}
    </div>);

  const MstPill=({tid,compact})=>{
    const l=mst(tid);
    return compact?(
      <div style={{display:"flex",gap:2}}>{[0,1,2,3,4].map(i=>(
        <div key={i} onClick={e=>{e.stopPropagation();setMst(tid,i);}} style={{width:14,height:14,borderRadius:4,cursor:"pointer",fontSize:8,
          display:"flex",alignItems:"center",justifyContent:"center",background:i<=l?mClr[l]:(dark?P.sf2:P.accS),color:i<=l?"#fff":P.tx3,border:`1px solid ${i<=l?mClr[l]:P.bdr}`,fontWeight:700}}>{i}</div>
      ))}</div>
    ):(
      <div style={{display:"flex",gap:4,alignItems:"center"}}>{[0,1,2,3,4].map(i=>(
        <button key={i} onClick={()=>setMst(tid,i)} style={{...btnS,background:i<=l?mClr[l]:(dark?P.sf2:P.accS),color:i<=l?"#fff":P.tx3,border:`1px solid ${i<=l?mClr[l]:P.bdr}`,padding:"4px 10px"}}>{i}</button>
      ))}<span style={{fontSize:11,color:mClr[l],fontWeight:600,marginLeft:4}}>{mLbl[l]}</span></div>
    );};

  const VBadge=({v})=>v?<span style={badge(P.ok,"#fff")}>VÉRIFIÉ</span>:<span style={badge(P.err,"#fff")}>NON_VERIFIE</span>;
  const SBadge=({s:src})=>{const c={Prof:P.ok,Moi:"#6366f1",ELIES:"#d4a040",Externe:P.tx3};return<span style={badge(c[src]||"#555")}>{src}</span>;};
  const FileLink=({f})=>(<a href={pdfRawUrl(f.f)} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{color:dark?"#F3C3C5":P.pri,textDecoration:"underline",textDecorationStyle:"dotted",fontSize:11}}>📄 {f.f}</a>);

  // Markdown renderer pour fiches IA (couleurs rose/violet)
  const MdRender=({text})=>{
    if(!text)return null;
    const lines=text.split("\n");
    return(<div style={{lineHeight:1.75,fontSize:12}}>
      {lines.map((line,i)=>{
        if(/^#{1,2}\s/.test(line)||line.startsWith("═══"))return<div key={i} style={{color:dark?"#F3C3C5":"#C65C69",fontWeight:800,fontSize:14,marginTop:16,marginBottom:4}}>{line.replace(/^#+\s*/,"").replace(/═+/g,"").trim()}</div>;
        if(/^#{3}\s/.test(line))return<div key={i} style={{color:dark?"#C4B5FD":"#7C3AED",fontWeight:700,fontSize:13,marginTop:12,marginBottom:2}}>{line.replace(/^#+\s*/,"").trim()}</div>;
        if(/^\d+\.\s/.test(line))return<div key={i} style={{color:dark?"#FADAD9":"#2D1215",fontWeight:700,marginTop:10,marginBottom:2}}>{line}</div>;
        if(/^[—\-▸]\s/.test(line)||/^\s+[—\-]\s/.test(line))return<div key={i} style={{color:dark?"#CE6F79":"#7A4048",paddingLeft:16,marginBottom:1}}>{line}</div>;
        if(line.includes("**")){const parts=line.split(/\*\*(.+?)\*\*/);return<div key={i} style={{marginBottom:2}}>{parts.map((p,j)=>j%2===1?<strong key={j} style={{color:dark?"#A78BFA":"#6D28D9"}}>{p}</strong>:<span key={j}>{p}</span>)}</div>;}
        if(!line.trim())return<div key={i} style={{height:6}}/>;
        return<div key={i} style={{color:dark?"#FADAD9":"#2D1215",marginBottom:1}}>{line}</div>;
      })}
    </div>);};

  // ═══════════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════════
  const VDash=()=>{
    const chartData=Object.entries(M).map(([k,m])=>{
      const ts=themesByMat(k),avg=ts.length?ts.reduce((s,t)=>s+mst(t.id),0)/ts.length:0;
      return{name:k,mastery:+(avg.toFixed(1)),fill:m.c};});
    return(<div>
      <h1 style={{fontSize:22,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>Dashboard</h1>
      <p style={{color:P.tx2,fontSize:11,marginBottom:16}}>{stats.v}/{stats.n} thèmes vérifiés · {KB.length} fichiers · {AN.length} annales · {(S.inProgress||[]).length} en cours</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
        {[{n:"Maîtrisés",v:stats.m3,c:P.ok,i:"🟩"},{n:"En cours",v:stats.studying,c:"#d4a040",i:"🟧"},
          {n:"Pas touchés",v:stats.m0,c:P.err,i:"⬜"},{n:"Moyenne",v:stats.avg.toFixed(1)+"/4",c:P.pri,i:"📈"}
        ].map((x,i)=>(<div key={i} style={{...card,textAlign:"center",borderTop:`3px solid ${x.c}`,padding:14}}>
          <div style={{fontSize:20}}>{x.i}</div><div style={{fontSize:20,fontWeight:800,color:P.priS}}>{x.v}</div>
          <div style={{fontSize:10,color:P.tx2}}>{x.n}</div></div>))}
      </div>
      <div style={{...card,marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:700,color:P.priS,marginBottom:8}}>Maîtrise par matière</div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={chartData}><XAxis dataKey="name" tick={{fill:P.tx2,fontSize:11}}/><YAxis domain={[0,4]} tick={{fill:P.tx3,fontSize:9}}/>
            <Tooltip contentStyle={{background:P.sf,border:`1px solid ${P.bdr}`,color:P.tx,fontSize:11,borderRadius:10}}/>
            <Bar dataKey="mastery" radius={[8,8,0,0]}>{chartData.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {Object.entries(M).map(([k,m])=>{
          const ts=themesByMat(k),avg=ts.length?ts.reduce((s,t)=>s+mst(t.id),0)/ts.length:0,pct=(avg/4)*100;
          const worked=ts.filter(t=>mst(t.id)>0).length;
          return(<div key={k} onClick={()=>{setView("mat");setSel(k);setSel2(null);}}
            style={{...card,borderLeft:`4px solid ${m.c}`,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div><div style={{fontSize:14,fontWeight:700,color:P.priS}}>{k}</div>
                <div style={{fontSize:10,color:P.tx2}}>{m.prof} · {m.ects} ECTS</div></div>
              <span style={badge(m.type==="MAJEURE"?P.pri:P.tx3)}>{m.type}</span></div>
            <div style={{height:5,borderRadius:3,background:P.bdr,overflow:"hidden",marginBottom:4}}>
              <div style={{height:"100%",width:`${pct}%`,background:m.c,borderRadius:3,transition:"width .3s"}}/></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:P.tx2}}>
              <span>{worked}/{ts.length} thèmes travaillés</span><span style={{color:m.c,fontWeight:700}}>{Math.round(pct)}%</span></div>
            {S.examDates[k]?<div style={{fontSize:9,color:P.tx3,marginTop:2}}>📅 J-{Math.max(0,Math.ceil((new Date(S.examDates[k])-Date.now())/864e5))}</div>
              :<div style={{fontSize:9,color:"#d4a040"}}>⚠ Date exam inconnue</div>}
          </div>);})}
      </div>
      <div style={card}>
        <div style={{fontSize:13,fontWeight:700,color:P.priS,marginBottom:8}}>🎯 Top 8 priorités</div>
        {priority.slice(0,8).map((t,i)=>(<div key={t.id} onClick={()=>{setView("mat");setSel(t.m);setSel2(t.id);}}
          style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${P.bdr}`,cursor:"pointer"}}>
          <span style={{fontSize:11,color:i<3?P.err:P.tx3,fontWeight:700,width:22,textAlign:"right"}}>{i<3?"🔥":""}{i+1}</span>
          <div style={{width:8,height:8,borderRadius:"50%",background:M[t.m]?.c}}/>
          <span style={{flex:1,fontSize:11,color:P.tx}}>{t.n}</span>
          <VBadge v={t.v}/><MstPill tid={t.id} compact/>
          <span style={{fontSize:10,color:P.tx3,width:30,textAlign:"right"}}>{t.score.toFixed(1)}</span>
        </div>))}
      </div>
      {T.filter(t=>!t.v).length>0&&(<div style={{...card,borderLeft:`3px solid ${P.err}`,background:dark?"#1a0e0e":"#fef2f2"}}>
        <div style={{color:P.err,fontSize:12,fontWeight:700}}>⚠ {T.filter(t=>!t.v).length} thèmes NON_VERIFIE</div>
        <div style={{color:P.tx2,fontSize:10,marginTop:4}}>{T.filter(t=>!t.v).map(t=>`${t.m}:${t.n.split("–")[0]}`).join(" · ")}</div>
      </div>)}
    </div>);};

  // ═══════════════════════════════════════════════════
  // MATIÈRE + THEME DETAIL
  // ═══════════════════════════════════════════════════
  const VMat=()=>{
    const k=sel,m=M[k];if(!m)return<VDash/>;
    const themes=themesByMat(k),files=KB.filter(f=>f.m===k),annales=AN.filter(a=>a.m===k);
    if(sel2){
      const theme=T.find(t=>t.id===sel2);if(!theme){setSel2(null);return null;}
      const tFiles=KB.filter(f=>theme.src.some(s=>f.f.includes(s.replace(".pdf","").trim().slice(0,15))));
      const fc=S.flashcards[theme.id]||[];
      return(<div>
        <button onClick={()=>setSel2(null)} style={{...btnG,marginBottom:8}}>← {k}</button>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
          <h2 style={{fontSize:17,fontWeight:800,color:m.c,margin:0}}>{theme.n}</h2>
          <VBadge v={theme.v}/><span style={badge(dark?P.sf2:P.accS,P.tx2)}>{theme.ax}</span></div>
        <div style={{...card,borderLeft:`3px solid ${mClr[mst(theme.id)]}`}}>
          <div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:6}}>Niveau de maîtrise</div>
          <MstPill tid={theme.id}/>
          {S.mastery[theme.id]?.lr&&<div style={{fontSize:10,color:P.tx3,marginTop:6}}>Dernière révision: {new Date(S.mastery[theme.id].lr).toLocaleDateString("fr-FR")} · {S.mastery[theme.id].count} sessions</div>}
        </div>
        <div style={{...card,display:"flex",gap:6,flexWrap:"wrap"}}>
          <button onClick={async()=>{
            await doAI(aiSys(theme.m,theme.id),
              `Génère une fiche de révision COMPLÈTE pour "${theme.n}" (${M[theme.m].full}, L1 Université de Toulon, ${M[theme.m].prof}).\n\nCONTENU DU COURS RÉEL :\n${COURSE_CTX[theme.id]||"Voir contenu général."}\n\nSTRUCTURE IMPÉRATIVE :\n## 1. NOTIONS CLÉS\n## 2. TEXTES APPLICABLES\n## 3. JURISPRUDENCE ESSENTIELLE\n## 4. MÉCANISMES ET PROCÉDURES\n## 5. DISTINCTIONS CLÉS\n## 6. PIÈGES D’EXAMEN\n## 7. PLAN-TYPE\n\nSois exhaustif. Niveau attendu : 14+/20 à l’examen.`,
              "fiche",theme.m,theme.n,true);
          }} style={btn} disabled={aiLoading}>{aiLoading?"⏳":"📝"} Fiche IA</button>
          <button onClick={async()=>{
            setAiLoading(true);setAiOut("⏳ Génération flashcards...");
            const courseContent=COURSE_CTX[theme.id]||Object.entries(COURSE_CTX).filter(([k])=>k.startsWith(theme.m+"_")).map(([,v])=>v).join(" ").slice(0,600);
            const r=await callAI(aiSys(theme.m,theme.id),`Génère 12 flashcards JSON pour le thème "${theme.n}" (${M[theme.m].full}).\n\nCONTENU DU COURS :\n${courseContent}\n\nRÈGLES : Réponses complètes 15-80 mots. Articles exacts, arrêts datés.\nFORMAT JSON strict : [{"q":"question","a":"réponse complète"},...]`,"flashcards",theme.m,theme.n);
            try{
              const parsed=JSON.parse(r.replace(/\`\`\`json|\`\`\`/g,"").trim());
              const cards=(Array.isArray(parsed)?parsed:[]).map((c,i)=>({...c,box:1,ef:2.5,interval:1,reps:0,next:new Date().toISOString(),id:`${theme.id}_${Date.now()}_${i}`}));
              if(cards.length>0){persist({...S,flashcards:{...S.flashcards,[theme.id]:[...(S.flashcards[theme.id]||[]),...cards]}});setAiOut(`✅ ${cards.length} flashcards générées !`);}
              else setAiOut("⚠ Aucune carte parsée. Réessaye.");
            }catch{setAiOut("⚠ Parsing échoué.");}
            setAiLoading(false);
          }} style={btn} disabled={aiLoading}>{aiLoading?"⏳":"🃏"} Flashcards</button>
          <button onClick={()=>{setView("exo");setExoMat(theme.m);setExoStep("choose");setAiOut("");}} style={btn}>✍️ S’exercer</button>
        </div>
        {aiOut&&<div style={{...card,borderLeft:`3px solid ${P.pri}`}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:11,fontWeight:700,color:P.pri}}>🤖 IA</span>
            <button onClick={()=>setAiOut("")} style={btnG}>✕</button></div>
          <MdRender text={aiOut}/></div>}
        {fc.length>0&&<div style={card}>
          <div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:6}}>🃏 Flashcards ({fc.length})</div>
          {fc.slice(0,3).map((c,i)=><div key={i} style={{padding:"4px 0",borderBottom:`1px solid ${P.bdr}`,fontSize:11,color:P.tx2}}>❓ {c.q}</div>)}
          {fc.length>3&&<span onClick={()=>{setView("flash");setFcTheme(theme.id);setFcIdx(0);setFcFlip(false);}} style={{fontSize:10,color:P.pri,cursor:"pointer"}}>Voir les {fc.length} cartes →</span>}
        </div>}
        <div style={card}>
          <div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:6}}>📁 Sources ({tFiles.length})</div>
          {tFiles.length===0&&<div style={{fontSize:11,color:P.err}}>Aucun fichier source</div>}
          {tFiles.map(f=>(<div key={f.id} style={{display:"flex",gap:6,alignItems:"center",padding:"3px 0"}}><SBadge s={f.s}/><FileLink f={f}/>{f.o&&<span style={{fontSize:9,color:P.ok}}>✓</span>}</div>))}
        </div>
        <div style={card}><div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:6}}>📝 Notes</div>
          <textarea value={S.notes[theme.id]||""} onChange={e=>setNote(theme.id,e.target.value)} placeholder="Notes perso..." style={ta}/></div>
      </div>);
    }
    const byAx={};themes.forEach(t=>{if(!byAx[t.ax])byAx[t.ax]=[];byAx[t.ax].push(t);});
    const axL={TD:"📝 TD",CM:"📖 CM",MEM:"🧠 Mémorisation",REV:"📚 Révision",METH:"📐 Méthodo"};
    // Coverage stats
    const worked=themes.filter(t=>mst(t.id)>0).length;
    const mastered=themes.filter(t=>mst(t.id)>=3).length;
    return(<div>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
        <h1 style={{fontSize:18,fontWeight:800,color:m.c,margin:0}}>{m.full}</h1>
        <span style={badge(m.type==="MAJEURE"?P.pri:P.tx3)}>{m.type}</span></div>
      <p style={{color:P.tx2,fontSize:11,marginBottom:10}}>{m.prof} · {m.ects} ECTS · {themes.length} thèmes · {files.length} fichiers{m.td?` · TD: ${m.td}`:""}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
        {[{l:"Travaillés",v:`${worked}/${themes.length}`,c:P.pri},{l:"Maîtrisés",v:`${mastered}/${themes.length}`,c:P.ok},{l:"Couverture",v:`${Math.round((worked/themes.length)*100)}%`,c:m.c}].map((x,i)=>
          <div key={i} style={{...card,textAlign:"center",padding:10}}><div style={{fontSize:16,fontWeight:800,color:x.c}}>{x.v}</div><div style={{fontSize:10,color:P.tx2}}>{x.l}</div></div>)}
      </div>
      <div style={{...card,display:"flex",gap:10,alignItems:"center"}}>
        <span style={{fontSize:11,color:P.tx2}}>📅 Exam:</span>
        <input type="date" value={S.examDates[k]||""} onChange={e=>persist({...S,examDates:{...S.examDates,[k]:e.target.value}})} style={{...inp,width:160}}/>
        {S.examDates[k]&&<span style={{fontSize:12,color:m.c,fontWeight:700}}>J-{Math.max(0,Math.ceil((new Date(S.examDates[k])-Date.now())/864e5))}</span>}
      </div>
      {Object.entries(byAx).map(([ax,ts])=>(<div key={ax} style={{marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:700,color:P.priS,marginBottom:6}}>{axL[ax]||ax}</div>
        {ts.map(t=>(<div key={t.id} onClick={()=>setSel2(t.id)}
          style={{...card,display:"flex",alignItems:"center",gap:8,padding:"10px 14px",cursor:"pointer"}}>
          <div style={{width:4,height:26,borderRadius:2,background:mClr[mst(t.id)]}}/>
          <div style={{flex:1}}><div style={{fontSize:12,color:P.tx,fontWeight:500}}>{t.n}</div></div>
          <VBadge v={t.v}/><MstPill tid={t.id} compact/>
        </div>))}
      </div>))}
      <div style={card}>
        <div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:6}}>📁 Fichiers ({files.length})</div>
        {files.slice(0,15).map(f=>(<div key={f.id} style={{display:"flex",gap:6,alignItems:"center",padding:"3px 0",borderBottom:`1px solid ${P.bdr}`,fontSize:11}}>
          <SBadge s={f.s}/><span style={tag}>{f.t}</span><FileLink f={f}/>{f.o&&<span style={{fontSize:9,color:P.ok}}>✓</span>}</div>))}
        {files.length>15&&<div style={{fontSize:10,color:P.tx3,marginTop:4}}>+{files.length-15} fichiers · <span onClick={()=>{setView("kb");setKbFilter(k);}} style={{color:P.pri,cursor:"pointer"}}>Voir tout →</span></div>}
      </div>
    </div>);};

  // ═══ PRIORITIES ════════════════════════════════════
  const VPrio=()=>(<div>
    <h1 style={{fontSize:18,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>🎯 Priorités</h1>
    <p style={{color:P.tx2,fontSize:11,marginBottom:12}}>Score = ECTS × Proximité × (1-Maîtrise/4) × Vérifié</p>
    {priority.map((t,i)=>(<div key={t.id} onClick={()=>{setView("mat");setSel(t.m);setSel2(t.id);}}
      style={{...card,display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
      <span style={{fontSize:11,color:i<3?P.err:P.tx3,fontWeight:700,width:24,textAlign:"right"}}>{i<3?"🔥":""}{i+1}</span>
      <div style={{width:8,height:8,borderRadius:"50%",background:M[t.m]?.c}}/>
      <div style={{flex:1}}><div style={{fontSize:12,color:P.tx}}>{t.n}</div><div style={{fontSize:10,color:P.tx3}}>{M[t.m]?.full}</div></div>
      <VBadge v={t.v}/><MstPill tid={t.id} compact/>
      <div style={{fontSize:12,fontWeight:700,color:t.score>3?P.err:t.score>1.5?"#d4a040":P.ok,width:32,textAlign:"right"}}>{t.score.toFixed(1)}</div>
    </div>))}
  </div>);

  // ═══ EXERCISE + AI (TYPE-SPECIFIC GENERATION) ════
  const VExo=()=>{
    const startTimer=(min)=>setTimer({total:min*60,remaining:min*60,active:true});
    return(<div>
      <h1 style={{fontSize:18,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>✍️ Exercice + Correction IA</h1>
      {exoStep==="choose"&&<div>
        <div style={card}><div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:6}}>1. Matière</div>
          <div style={{display:"flex",gap:6}}>{Object.entries(M).map(([k,m])=>(
            <button key={k} onClick={()=>{setExoMat(k);setExoType("");}} style={{...btnS,background:exoMat===k?m.c:(dark?P.sf2:P.sf),color:exoMat===k?"#fff":P.tx2}}>{k}</button>))}</div></div>
        {exoMat&&<div style={card}><div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:6}}>2. Type</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{M[exoMat].ex.map(t=>(
            <button key={t} onClick={()=>setExoType(t)} style={{...btnS,background:exoType===t?P.pri:(dark?P.sf2:P.sf),color:exoType===t?"#fff":P.tx2}}>{t}</button>))}</div></div>}
        {exoType&&<div style={card}><div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:6}}>3. Sujet</div>
          <div style={{display:"flex",gap:6,marginBottom:8}}>
            <button onClick={async()=>{
              const matCtx=Object.entries(COURSE_CTX).filter(([k])=>k.startsWith(exoMat+"_")).map(([,v])=>v).join(" ");
              const prompt=buildExoPrompt(exoType,exoMat,matCtx);
              const r=await doAI(aiSys(exoMat),prompt,"sujet",exoMat,exoType,true);
              setExoSubject(r);setActiveInProgId(null);setExoAnswer("");setExoStep("write");
            }} style={btn} disabled={aiLoading}>{aiLoading?"⏳":"🎲"} Sujet IA</button>
            <button onClick={()=>{setExoSubject("");setActiveInProgId(null);setExoAnswer("");setExoStep("write");}} style={btnS}>📝 Mon sujet</button></div>
          {AN.filter(a=>a.m===exoMat&&(a.t===exoType||a.t.toLowerCase().includes(exoType.toLowerCase().slice(0,6)))).slice(0,6).map(a=>(<div key={a.id}
            onClick={()=>{setExoSubject(a.body||a.s);setExoType(a.t);setActiveInProgId(null);setExoAnswer("");setExoStep("write");}}
            style={{padding:"6px 8px",borderBottom:`1px solid ${P.bdr}`,cursor:"pointer",borderRadius:8,marginBottom:2}}>
            <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:2}}>
              <span style={badge(M[a.m]?.c)}>{a.m}</span><span style={badge(dark?P.sf2:P.accS,P.tx2)}>{a.t}</span>
              <span style={{fontSize:10,color:P.tx3}}>{a.y}</span>
              {a.source&&<span style={{fontSize:9,color:P.tx3,fontStyle:"italic"}}>{a.source}</span>}</div>
            <div style={{fontSize:11,color:P.tx}}>{a.s}</div>
            {a.body&&<div style={{fontSize:10,color:P.ok,marginTop:2}}>✓ Contenu intégral disponible</div>}
          </div>))}
          {AN.filter(a=>a.m===exoMat).length===0&&<div style={{fontSize:11,color:P.tx3}}>Pas d’annales pour cette matière. Utilise "Sujet IA".</div>}
        </div>}
      </div>}
      {exoStep==="write"&&<div>
        {aiLoading&&<div style={{...card,borderLeft:`3px solid ${P.pri}`,textAlign:"center",color:P.tx2,fontSize:12}}>{aiOut}</div>}
        <div style={{...card,borderLeft:`3px solid ${M[exoMat]?.c}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div><span style={badge(M[exoMat]?.c)}>{exoMat}</span><span style={badge(dark?P.sf2:P.accS,P.tx2)}>{exoType}</span>
              {activeInProgId&&<span style={{fontSize:10,color:P.ok,marginLeft:4}}>💾 Sauvegardé</span>}</div>
            {!timer?.active?<div style={{display:"flex",gap:4}}>
              <button onClick={()=>startTimer(180)} style={btnS}>⏱ 3h</button>
              <button onClick={()=>startTimer(90)} style={btnS}>1h30</button>
              <button onClick={()=>startTimer(60)} style={btnS}>1h</button></div>
              :<div style={{fontSize:18,fontWeight:800,color:timer.remaining<300?P.err:P.ok,fontVariantNumeric:"tabular-nums"}}>⏱ {fmtTime(timer.remaining)}</div>}
          </div>
          {exoSubject
            ?<div style={{whiteSpace:"pre-wrap",fontSize:12,color:P.tx,padding:12,background:dark?P.sf2:"#fff",borderRadius:10,lineHeight:1.7}}>{exoSubject}</div>
            :<textarea value={exoSubject} onChange={e=>setExoSubject(e.target.value)} placeholder="Colle ou écris ton sujet..." style={{...ta,minHeight:80}}/>}
        </div>
        <div style={card}>
          <textarea value={exoAnswer} onChange={e=>setExoAnswer(e.target.value)} placeholder="Rédige ta réponse..." style={{...ta,minHeight:280}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
            <span style={{fontSize:10,color:P.tx3}}>{exoAnswer.length} car · ~{Math.round(exoAnswer.length/6)} mots</span>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>{setExoStep("choose");setExoSubject("");setExoAnswer("");setAiOut("");setActiveInProgId(null);}} style={btnS}>✖ Abandonner</button>
              <button onClick={async()=>{
                if(timer?.active)setTimer(t=>({...t,active:false}));
                if(activeInProgId)removeInProg(activeInProgId);
                setActiveInProgId(null);
                const meth=Object.values(METH).find(m=>m.n.toLowerCase().includes(exoType.toLowerCase().slice(0,4)))||METH.dissertation;
                const themeCtx=Object.entries(COURSE_CTX).filter(([k])=>k.startsWith(exoMat+"_")).map(([,v])=>v).join("\n").slice(0,1000);
                const r=await doAI(aiSys(exoMat,null),
                  `═══ CORRECTION UNIVERSITAIRE — ${M[exoMat]?.prof} — ${M[exoMat]?.full} ═══\n\nSUJET :\n${exoSubject}\n\nCOPIE (${exoAnswer.length} car.) :\n${exoAnswer}\n\nCONTENU DU COURS :\n${themeCtx}\n\n1. NOTE /20 (justifiée)\n2. ANALYSE INTRODUCTION\n3. CONTENU JURIDIQUE (articles/arrêts cités, manquants)\n4. SYLLOGISME\n5. ERREURS FATALES\n6. POINTS FORTS\n7. PLAN MODÈLE\n8. PRIORITÉS AVANT L’EXAMEN\n\nMéthode ${exoType}: ${meth.structure}`,
                  "correction",exoMat,exoType,true);
                addHist({mat:exoMat,type:exoType,subject:exoSubject,answer:exoAnswer,aiFeedback:r,duration:timer?timer.total-timer.remaining:0});
                updateMasteryFromCorrection(exoMat,r);
                setExoStep("result");
              }} style={btn} disabled={aiLoading||!exoAnswer.trim()}>{aiLoading?"⏳":"🎓"} Corriger</button></div>
          </div>
        </div>
      </div>}
      {exoStep==="result"&&<div>
        {aiOut&&<div style={{...card,borderLeft:`3px solid ${P.pri}`}}>
          <div style={{fontSize:13,fontWeight:700,color:P.pri,marginBottom:8}}>🎓 Correction</div>
          <MdRender text={aiOut}/></div>}
        <div style={{display:"flex",gap:6,marginTop:8}}>
          <button onClick={()=>{setExoStep("choose");setExoSubject("");setExoAnswer("");setAiOut("");setActiveInProgId(null);}} style={btn}>🔄 Nouveau</button>
          <button onClick={()=>setView("hist")} style={btnS}>📜 Historique</button></div>
      </div>}
    </div>);};

  // ═══ EXERCICES EN COURS ════════════════════════════
  const VInProgress=()=>{
    const list=S.inProgress||[];
    const resumeExo=(ex)=>{
      setExoMat(ex.mat);setExoType(ex.type);setExoSubject(ex.subject);setExoAnswer(ex.answer||"");
      setActiveInProgId(ex.id);setExoStep("write");setAiOut("");setView("exo");
    };
    return(<div>
      <h1 style={{fontSize:18,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>🔄 Exercices en cours</h1>
      <p style={{color:P.tx2,fontSize:11,marginBottom:12}}>{list.length} exercice{list.length>1?"s":""} en attente</p>
      {list.length===0&&<div style={{...card,textAlign:"center",padding:32,color:P.tx2}}>
        <div style={{fontSize:18,marginBottom:8}}>📚</div>
        <div style={{fontSize:13}}>Aucun exercice en cours</div>
        <div style={{fontSize:11,marginTop:4}}>Commence un exercice depuis ✍️ Exercice + IA</div>
        <button onClick={()=>setView("exo")} style={{...btn,marginTop:12}}>Commencer un exercice</button>
      </div>}
      {list.map(ex=>(<div key={ex.id} style={{...card,borderLeft:`4px solid ${M[ex.mat]?.c||P.pri}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div>
            <div style={{display:"flex",gap:4,marginBottom:4}}>
              <span style={badge(M[ex.mat]?.c)}>{ex.mat}</span>
              <span style={badge(dark?P.sf2:P.accS,P.tx2)}>{ex.type}</span></div>
            <div style={{fontSize:13,fontWeight:600,color:P.tx,marginBottom:4}}>{ex.subject?.slice(0,80)}{ex.subject?.length>80?"...":""}</div>
            <div style={{fontSize:10,color:P.tx3}}>
              Débuté : {new Date(ex.startedAt).toLocaleDateString("fr-FR")} · 
              Modifié : {new Date(ex.updatedAt).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})} · 
              {Math.round((ex.answer||"").length/6)} mots</div>
          </div>
          <button onClick={()=>removeInProg(ex.id)} style={{...btnG,color:P.err,fontSize:16}} title="Supprimer">×</button></div>
        {ex.answer&&<div style={{fontSize:11,color:P.tx3,fontStyle:"italic",marginBottom:8,padding:"6px 10px",background:dark?P.sf2:"#fff",borderRadius:8}}>
          {ex.answer.slice(0,120)}{ex.answer.length>120?"...":""}</div>}
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>resumeExo(ex)} style={btn}>▶️ Reprendre</button>
          <button onClick={()=>{setExoSubject(ex.subject||"");setExoType(ex.type);setExoMat(ex.mat);setExoAnswer(ex.answer||"");setActiveInProgId(ex.id);setExoStep("result");removeInProg(ex.id);addHist({mat:ex.mat,type:ex.type,subject:ex.subject,answer:ex.answer||"",aiFeedback:"",duration:0});setView("hist");}} style={btnS}>Archiver sans corriger</button>
        </div>
      </div>))}
    </div>);};

  // ═══ FLASHCARDS (SM-2) ════════════════════════════
  const VFlash=()=>{
    const allCards=fcTheme?(S.flashcards[fcTheme]||[]):Object.values(S.flashcards).flat();
    const total=Object.values(S.flashcards).flat().length;
    const dueCards=allCards.filter(c=>new Date(c.next||0)<=new Date());
    if(fcTheme&&allCards.length>0){
      const deck=dueCards.length>0?dueCards:allCards;
      const c=deck[fcIdx%deck.length];
      const rate=(q)=>{
        const updated=sm2(q,c);
        const thId=Object.entries(S.flashcards).find(([,cards])=>cards.some(x=>x.id===c.id))?.[0];
        if(thId){persist({...S,flashcards:{...S.flashcards,[thId]:S.flashcards[thId].map(x=>x.id===c.id?updated:x)}});}
        setFcFlip(false);setFcIdx(i=>(i+1)%deck.length);
      };
      return(<div>
        <button onClick={()=>{setFcTheme(null);setFcIdx(0);setFcFlip(false);}} style={{...btnG,marginBottom:8}}>← Retour</button>
        <div style={{textAlign:"center",marginBottom:10}}>
          <div style={{fontSize:10,color:P.tx3}}>{fcIdx+1}/{deck.length}{dueCards.length>0?` (${dueCards.length} dues)`:""}</div>
          <div style={{height:4,borderRadius:2,background:P.bdr,marginTop:4}}><div style={{height:"100%",width:`${((fcIdx+1)/deck.length)*100}%`,background:P.pri,borderRadius:2}}/></div>
        </div>
        <div onClick={()=>setFcFlip(!fcFlip)} style={{...card,minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",borderLeft:`4px solid ${fcFlip?P.ok:P.pri}`,textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:fcFlip?400:600,color:fcFlip?P.ok:P.priS,lineHeight:1.7,maxWidth:500}}>{fcFlip?c.a:c.q}</div>
          <div style={{fontSize:10,color:P.tx3,marginTop:12}}>{fcFlip?"RÉPONSE":"QUESTION — clic pour retourner"}</div>
        </div>
        {fcFlip&&<div style={{display:"flex",justifyContent:"center",gap:6,marginTop:10}}>
          <button onClick={()=>rate(1)} style={{...btnS,color:P.err}}>💥 Oublié</button>
          <button onClick={()=>rate(3)} style={{...btnS,color:"#d4a040"}}>🤔 Dur</button>
          <button onClick={()=>rate(4)} style={{...btnS,color:P.ok}}>😊 Bien</button>
          <button onClick={()=>rate(5)} style={{...btnS,color:P.ok,fontWeight:700}}>🎯 Facile</button>
        </div>}
      </div>);
    }
    return(<div>
      <h1 style={{fontSize:18,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>🃏 Flashcards SM-2</h1>
      <p style={{color:P.tx2,fontSize:11,marginBottom:12}}>{total} cartes · Répétition espacée</p>
      {total===0&&<div style={{...card,textAlign:"center",padding:24}}><div style={{fontSize:14,color:P.tx2}}>Aucune flashcard</div><div style={{fontSize:11,color:P.tx3}}>Va sur un thème → 🃏 Flashcards</div></div>}
      {Object.entries(M).map(([k,m])=>{
        const mCards=themesByMat(k).flatMap(t=>(S.flashcards[t.id]||[]));
        if(!mCards.length)return null;
        return(<div key={k} style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:m.c,marginBottom:6}}>{m.full} ({mCards.length})</div>
          {themesByMat(k).filter(t=>(S.flashcards[t.id]||[]).length>0).map(t=>{
            const tc=S.flashcards[t.id]||[],td=tc.filter(c=>new Date(c.next||0)<=new Date()).length;
            return(<div key={t.id} onClick={()=>{setFcTheme(t.id);setFcIdx(0);setFcFlip(false);}}
              style={{...card,display:"flex",justifyContent:"space-between",cursor:"pointer"}}>
              <span style={{fontSize:12,color:P.tx}}>{t.n}</span>
              <div>{td>0&&<span style={badge(P.err)}>{td} dues</span>}<span style={badge(m.c)}>{tc.length}</span></div>
            </div>);})}
        </div>);})}
    </div>);};

  // ═══ ANNALES (avec source & body complet) ════════
  const VAnn=()=>{
    const[annSel,setAnnSel]=useState(null);
    const filtered=annFilter==="all"?AN:AN.filter(a=>a.m===annFilter);
    if(annSel){
      const a=AN.find(x=>x.id===annSel);
      if(!a){setAnnSel(null);return null;}
      return(<div>
        <button onClick={()=>setAnnSel(null)} style={{...btnG,marginBottom:8}}>← Annales</button>
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginBottom:8}}>
          <span style={badge(M[a.m]?.c)}>{a.m}</span>
          <span style={badge(dark?P.sf2:P.accS,P.tx2)}>{a.t}</span>
          <span style={{fontSize:11,color:P.tx3}}>{a.y}</span></div>
        {a.source&&<div style={{...card,borderLeft:`3px solid #d4a040`,background:dark?"#1a1500":"#fefce8",padding:10,marginBottom:8}}>
          <div style={{fontSize:10,color:"#d4a040",fontWeight:700}}>📌 Source</div>
          <div style={{fontSize:11,color:P.tx2}}>{a.source}</div>
          {a.prof&&<div style={{fontSize:10,color:P.tx3,marginTop:2}}>Professeur : {a.prof}</div>}
        </div>}
        <div style={card}>
          <div style={{fontSize:13,fontWeight:700,color:P.priS,marginBottom:10}}>{a.s}</div>
          {a.body
            ?<div style={{whiteSpace:"pre-wrap",fontSize:12,color:P.tx,lineHeight:1.8,padding:12,background:dark?P.sf2:"#fff",borderRadius:10}}>{a.body}</div>
            :<div style={{fontSize:11,color:P.tx3,fontStyle:"italic",padding:10,background:dark?P.sf2:"#f9f9f9",borderRadius:8}}>
              📌 Pour les dissertations, l’intitulé ci-dessus est le sujet complet.\n
              Pour les cas pratiques et QCM, le scénario intégral figure dans le PDF de TD disponible dans la KB.
            </div>}
        </div>
        <div style={{display:"flex",gap:6,marginTop:8}}>
          <button onClick={()=>{setView("exo");setExoMat(a.m);setExoSubject(a.body||a.s);setExoType(a.t);setActiveInProgId(null);setExoAnswer("");setExoStep("write");setAiOut("");}} style={btn}>✍️ Travailler ce sujet</button>
          {AN.filter(x=>x.m===a.m&&x.th?.some(t=>a.th?.includes(t))&&x.id!==a.id).slice(0,3).map(x=>
            <button key={x.id} onClick={()=>setAnnSel(x.id)} style={btnS}>Sujet similaire → {x.y}</button>)}
        </div>
      </div>);
    }
    return(<div>
      <h1 style={{fontSize:18,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>📋 Annales ({AN.length})</h1>
      <p style={{color:P.tx2,fontSize:11,marginBottom:8}}>Sources : voir chaque sujet · Sujets marqués ✅ ont un contenu intégral</p>
      <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>
        <button onClick={()=>setAnnFilter("all")} style={{...btnS,background:annFilter==="all"?P.pri:(dark?P.sf2:P.sf),color:annFilter==="all"?"#fff":P.tx2}}>Toutes ({AN.length})</button>
        {Object.entries(M).map(([k,m])=>(<button key={k} onClick={()=>setAnnFilter(k)} style={{...btnS,background:annFilter===k?m.c:(dark?P.sf2:P.sf),color:annFilter===k?"#fff":P.tx2}}>{k} ({AN.filter(a=>a.m===k).length})</button>))}
      </div>
      {filtered.map(a=>(<div key={a.id} onClick={()=>setAnnSel(a.id)} style={{...card,cursor:"pointer"}}>
        <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
          <span style={badge(M[a.m]?.c)}>{a.m}</span>
          <span style={badge(dark?P.sf2:P.accS,P.tx2)}>{a.t}</span>
          <span style={{fontSize:10,color:P.tx3}}>{a.y}</span>
          {a.body&&<span style={{fontSize:9,color:P.ok,fontWeight:700}}>✅ Contenu intégral</span>}
        </div>
        <div style={{fontSize:12,color:P.tx,lineHeight:1.5,marginBottom:4}}>{a.s}</div>
        {a.source&&<div style={{fontSize:9,color:P.tx3,fontStyle:"italic"}}>{a.source}</div>}
      </div>))}
    </div>);};

  // ═══ METHODOLOGIES ════════════════════════════════
  const VMeth=()=>{
    if(methSel){const m=METH[methSel];return(<div>
      <button onClick={()=>setMethSel(null)} style={{...btnG,marginBottom:8}}>← Retour</button>
      <h1 style={{fontSize:17,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>{m.n}</h1>
      <div style={{display:"flex",gap:4,marginBottom:10}}>{m.forMat.map(k=><span key={k} style={badge(M[k]?.c)}>{k}</span>)}<VBadge v={m.v}/></div>
      {[{t:"📐 Structure",c:m.structure,cl:P.pri},{t:"🔺 Syllogisme",c:m.syllogisme,cl:"#6366f1"},
        {t:"❌ Erreurs éliminatoires",c:m.erreurs,cl:P.err},{t:"✅ Points valorisés",c:m.points,cl:P.ok},
        {t:"⏱ Temps",c:m.temps,cl:"#d4a040"}].map((sec,i)=>(<div key={i} style={{...card,borderLeft:`3px solid ${sec.cl}`}}>
        <div style={{fontSize:12,fontWeight:700,color:P.priS,marginBottom:6}}>{sec.t}</div>
        <div style={{fontSize:12,color:P.tx2,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{sec.c}</div></div>))}
    </div>);}
    return(<div>
      <h1 style={{fontSize:18,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>📐 Méthodologies</h1>
      <div style={{...card,borderLeft:`3px solid #6366f1`,marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:P.priS}}>🔺 Syllogisme juridique</div>
        <div style={{fontSize:12,color:P.tx,marginTop:4}}><strong>Majeure</strong> (règle) → <strong>Mineure</strong> (application) → <strong>Conclusion</strong></div>
      </div>
      {Object.entries(METH).map(([k,m])=>(<div key={k} onClick={()=>setMethSel(k)} style={{...card,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:13,fontWeight:600,color:P.tx}}>{m.n}</div>
          <div style={{display:"flex",gap:4,marginTop:4}}>{m.forMat.map(k=><span key={k} style={badge(M[k]?.c)}>{k}</span>)}</div></div>
        <VBadge v={m.v}/></div>))}
    </div>);};

  // ═══ KB CONSOLE ════════════════════════════════════
  const VKB=()=>{
    const filtered=KB.filter(f=>(kbFilter==="all"||f.m===kbFilter)&&(kbType==="all"||f.t===kbType));
    return(<div>
      <h1 style={{fontSize:18,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>📁 KB ({KB.length})</h1>
      <div style={{...card,borderLeft:`3px solid ${KB.length===85?P.ok:P.err}`}}>
        <span style={{fontSize:11,color:KB.length===85?P.ok:P.err,fontWeight:600}}>Intégrité: {KB.length}/85 {KB.length===85?"✅":"⚠️"}</span>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}>
        <button onClick={()=>setKbFilter("all")} style={{...btnS,background:kbFilter==="all"?P.pri:(dark?P.sf2:P.sf),color:kbFilter==="all"?"#fff":P.tx2}}>Tous</button>
        {Object.entries(M).map(([k,m])=>(<button key={k} onClick={()=>setKbFilter(k)} style={{...btnS,background:kbFilter===k?m.c:(dark?P.sf2:P.sf),color:kbFilter===k?"#fff":P.tx2}}>{k} ({KB.filter(f=>f.m===k).length})</button>))}
      </div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {["all",...new Set(KB.map(f=>f.t))].map(t=>(<button key={t} onClick={()=>setKbType(t)} style={{...btnS,background:kbType===t?P.pri:(dark?P.sf2:P.sf),color:kbType===t?"#fff":P.tx2}}>{t==="all"?"Types":t}</button>))}
      </div>
      {filtered.map(f=>(<div key={f.id} style={{display:"flex",gap:6,alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${P.bdr}`,fontSize:11}}>
        <span style={{color:P.tx3,width:22,textAlign:"right"}}>{f.id}</span>
        <span style={badge(M[f.m]?.c)}>{f.m}</span><SBadge s={f.s}/><span style={tag}>{f.t}</span>
        <FileLink f={f}/>{f.o&&<span style={{fontSize:9,color:P.ok}}>✓</span>}
      </div>))}
      <div style={{fontSize:10,color:P.tx3,marginTop:8}}>{filtered.length} fichiers</div>
    </div>);};

  // ═══ HISTORIQUE ════════════════════════════════════
  const VHist=()=>{
    if(histSel){
      const h=S.history.find(x=>x.id===histSel);if(!h){setHistSel(null);return null;}
      return(<div>
        <button onClick={()=>setHistSel(null)} style={{...btnG,marginBottom:8}}>← Retour</button>
        <h2 style={{fontSize:15,fontWeight:700,color:P.priS}}>{new Date(h.ts).toLocaleDateString("fr-FR")}</h2>
        <div style={{display:"flex",gap:4,marginBottom:8}}><span style={badge(M[h.mat]?.c)}>{h.mat}</span><span style={badge(dark?P.sf2:P.accS,P.tx2)}>{h.type}</span>
          {h.duration>0&&<span style={{fontSize:10,color:P.tx3}}>⏱ {Math.round(h.duration/60)}min</span>}</div>
        <div style={{...card,borderLeft:`3px solid ${M[h.mat]?.c}`}}><div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:4}}>Sujet</div>
          <div style={{fontSize:12,color:P.tx,whiteSpace:"pre-wrap",lineHeight:1.7}}>{h.subject}</div></div>
        <div style={card}><div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:4}}>Copie ({h.answer?.length||0} car.)</div>
          <div style={{fontSize:12,color:P.tx2,whiteSpace:"pre-wrap",lineHeight:1.6}}>{h.answer}</div></div>
        {h.aiFeedback&&<div style={{...card,borderLeft:`3px solid ${P.pri}`}}>
          <div style={{fontSize:12,fontWeight:700,color:P.pri,marginBottom:6}}>🎓 Correction</div>
          <MdRender text={h.aiFeedback}/></div>}
      </div>);}
    return(<div>
      <h1 style={{fontSize:18,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>📜 Historique ({S.history.length})</h1>
      {S.history.length===0&&<div style={{...card,textAlign:"center",color:P.tx2,padding:24}}>Aucun exercice corrigé.</div>}
      {[...S.history].reverse().map(h=>(<div key={h.id} onClick={()=>setHistSel(h.id)}
        style={{...card,display:"flex",justifyContent:"space-between",cursor:"pointer"}}>
        <div><div style={{display:"flex",gap:4,marginBottom:2}}><span style={badge(M[h.mat]?.c)}>{h.mat}</span><span style={badge(dark?P.sf2:P.accS,P.tx2)}>{h.type}</span></div>
          <div style={{fontSize:11,color:P.tx}}>{h.subject?.slice(0,70)}{h.subject?.length>70?"...":""}</div></div>
        <div style={{textAlign:"right"}}><div style={{fontSize:10,color:P.tx3}}>{new Date(h.ts).toLocaleDateString("fr-FR")}</div></div>
      </div>))}
    </div>);};

  // ═══ QCM ════════════════════════════════════════════
  const VQCM=()=>{
    const startQCM=(mat)=>{
      const pool=(mat==="all"?QCM_BANK:QCM_BANK.filter(q=>q.m===mat)).sort(()=>Math.random()-0.5);
      setQcmDeck(pool);setQcmIdx(0);setQcmAns(null);setQcmScore({right:0,wrong:0});setQcmDone(false);
    };
    if(!qcmDeck.length||qcmDone){
      const total=qcmScore.right+qcmScore.wrong;
      return(<div>
        <h1 style={{fontSize:18,fontWeight:800,color:P.priS,margin:"0 0 4px"}}>🎯 QCM — Entraînement</h1>
        <p style={{color:P.tx2,fontSize:11,marginBottom:12}}>{QCM_BANK.length} questions · DC, DDF, IA, HD</p>
        {qcmDone&&total>0&&(<div style={{...card,borderLeft:`4px solid ${qcmScore.right/total>=0.7?P.ok:P.err}`,marginBottom:14}}>
          <div style={{fontSize:16,fontWeight:800,color:P.priS}}>Score: {qcmScore.right}/{total}</div>
          <div style={{fontSize:13,color:qcmScore.right/total>=0.7?P.ok:P.err,marginTop:2}}>
            {qcmScore.right/total>=0.8?"🏆 Excellent !":qcmScore.right/total>=0.6?"👍 Bien, continue !":"📚 À retravailler"}</div>
          <div style={{marginTop:8,height:8,borderRadius:4,background:P.bdr,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(qcmScore.right/total)*100}%`,background:qcmScore.right/total>=0.7?P.ok:P.err,transition:"width .4s"}}/></div>
        </div>)}
        <div style={card}>
          <div style={{fontSize:12,fontWeight:600,color:P.tx,marginBottom:8}}>Lancer un QCM</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button onClick={()=>startQCM("all")} style={btn}>🎲 Toutes matières ({QCM_BANK.length})</button>
            {Object.entries(M).map(([k,m])=>(<button key={k} onClick={()=>startQCM(k)} style={{...btnS,borderLeft:`3px solid ${m.c}`}}>{k} ({QCM_BANK.filter(q=>q.m===k).length})</button>))}
          </div>
        </div>
        <div style={{...card,borderLeft:`3px solid #6366f1`}}>
          <div style={{fontSize:12,fontWeight:600,color:P.priS,marginBottom:4}}>💡 Stratégie QCM</div>
          <div style={{fontSize:11,color:P.tx2,lineHeight:1.7}}>
            • Lis TOUTES les propositions avant de choisir<br/>
            • Méfie-toi des absolus (toujours, jamais, uniquement)<br/>
            • Attention aux doubles négations<br/>
            • Distingue principe / exception / condition</div>
        </div>
      </div>);}
    const q=qcmDeck[qcmIdx];const isLast=qcmIdx>=qcmDeck.length-1;const answered=qcmAns!==null;
    const handleAnswer=(idx)=>{if(answered)return;setQcmAns(idx);if(idx===q.a)setQcmScore(s=>({...s,right:s.right+1}));else setQcmScore(s=>({...s,wrong:s.wrong+1}));};
    const next=()=>{if(isLast){setQcmDone(true);return;}setQcmIdx(i=>i+1);setQcmAns(null);};
    const pct=((qcmIdx+1)/qcmDeck.length)*100;
    return(<div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <h1 style={{fontSize:15,fontWeight:800,color:P.priS,margin:0}}>🎯 QCM</h1>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:11,color:P.ok,fontWeight:700}}>✓ {qcmScore.right}</span>
          <span style={{fontSize:11,color:P.err,fontWeight:700}}>✗ {qcmScore.wrong}</span>
          <button onClick={()=>{setQcmDeck([]);setQcmDone(false);}} style={btnS}>✕ Stop</button>
        </div>
      </div>
      <div style={{height:5,borderRadius:3,background:P.bdr,marginBottom:10,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:P.pri,borderRadius:3,transition:"width .3s"}}/></div>
      <div style={{fontSize:10,color:P.tx3,marginBottom:10,textAlign:"right"}}>{qcmIdx+1}/{qcmDeck.length} · <span style={badge(M[q.m]?.c)}>{q.m}</span></div>
      <div style={{...card,borderLeft:`4px solid ${M[q.m]?.c||P.pri}`,marginBottom:10}}>
        <div style={{fontSize:14,fontWeight:600,color:P.tx,lineHeight:1.6}}>{q.q}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
        {q.choices.map((c,i)=>{
          let bg=dark?P.sf2:"#fff",bdr=P.bdr,col=P.tx;
          if(answered){if(i===q.a){bg=dark?"#1a3a2a":"#e6f7f0";bdr=P.ok;col=P.ok;}else if(i===qcmAns&&i!==q.a){bg=dark?"#3a1a1a":"#fef2f2";bdr=P.err;col=P.err;}}
          return(<button key={i} onClick={()=>handleAnswer(i)} style={{background:bg,border:`2px solid ${bdr}`,borderRadius:10,padding:"10px 14px",cursor:answered?"default":"pointer",textAlign:"left",fontSize:12,color:col,fontFamily:"inherit",fontWeight:answered&&i===q.a?700:400,transition:"all .15s"}}>
            <span style={{fontWeight:700,marginRight:8,color:answered&&i===q.a?P.ok:P.tx3}}>{["A","B","C","D"][i]}.</span>{c}
            {answered&&i===q.a&&<span style={{float:"right",fontSize:16}}>✓</span>}
            {answered&&i===qcmAns&&i!==q.a&&<span style={{float:"right",fontSize:16}}>✗</span>}
          </button>);
        })}
      </div>
      {answered&&(<div style={{...card,borderLeft:`3px solid ${qcmAns===q.a?P.ok:P.err}`,marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:700,color:qcmAns===q.a?P.ok:P.err,marginBottom:4}}>
          {qcmAns===q.a?"✓ Correct !":"✗ Incorrect — La bonne réponse : "+q.choices[q.a]}</div>
        <div style={{fontSize:12,color:P.tx2,lineHeight:1.6}}>{q.exp}</div>
      </div>)}
      {answered&&(<button onClick={next} style={{...btn,width:"100%"}}>{isLast?"🏆 Voir mes résultats":"Suivant →"}</button>)}
    </div>);};


  // ─── VKBChat ─────────────────────────────────────────────────────────────
  const VKBChat=()=>{
    const mats=Object.keys(M);
    const curMat=kbChatMat||mats[0];
    const kbFiles=KB.filter(f=>f.m===curMat);
    const handleSend=async()=>{
      const q=kbChatInput.trim();if(!q||kbChatLoading)return;
      setKbChatInput("");
      setKbChatMsgs(prev=>[...prev,{role:"user",text:q}]);
      setKbChatLoading(true);
      const kbList=kbFiles.map(f=>`- ${f.f} (${f.t||"CM"})`).join("\n");
      const matCtx=Object.entries(COURSE_CTX).filter(([k])=>k.startsWith(curMat+"_")).map(([,v])=>v).join(" | ");
      const history=kbChatMsgs.slice(-8).map(m=>`${m.role==="user"?"Étudiant":"Assistant"}: ${m.text}`).join("\n");
      const sys=`Tu es un assistant pédagogique pour L1 Droit S2 Toulon. Tu réponds UNIQUEMENT en te basant sur les documents du cours fournis. Tu ne fais PAS de recherche web. Si la réponse n'est pas dans les documents, dis-le clairement.\n\nDocuments disponibles pour ${curMat} (${kbFiles.length} fichiers):\n${kbList}\n\nContexte du cours:\n${matCtx||M[curMat]?.full||curMat}`;
      const prompt=history?`${history}\nÉtudiant: ${q}`:q;
      try{
        const res=await callAI(sys,prompt,"chat",curMat,"");
        setKbChatMsgs(prev=>[...prev,{role:"assistant",text:res}]);
      }catch(e){
        setKbChatMsgs(prev=>[...prev,{role:"assistant",text:"Erreur : "+e.message}]);
      }finally{setKbChatLoading(false);}
    };
    const handleKey=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSend();}};
    const clearChat=()=>{setKbChatMsgs([]);};
    return(
      <div style={{display:"flex",flexDirection:"column",height:"100%",minHeight:500}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h1 style={{fontSize:15,fontWeight:800,color:P.priS,margin:0}}>💬 Chat Base de Connaissances</h1>
          <button onClick={clearChat} style={btnS}>✕ Effacer</button>
        </div>
        <div style={{...card,marginBottom:12,padding:"8px 12px"}}>
          <div style={{fontSize:11,fontWeight:700,color:P.tx3,marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Matière</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {mats.map(k=>(
              <button key={k} onClick={()=>{setKbChatMat(k);setKbChatMsgs([]);}}
                style={{...btnS,background:curMat===k?M[k].c:"transparent",color:curMat===k?"#fff":P.tx2,borderColor:M[k].c,fontWeight:curMat===k?700:400,fontSize:11}}>
                {k}
              </button>
            ))}
          </div>
        </div>
        <div style={{...card,marginBottom:8,padding:"8px 12px",background:dark?"#1e1015":"#fff8f8"}}>
          <div style={{fontSize:10,fontWeight:600,color:P.tx3,marginBottom:4}}>📂 Fichiers disponibles ({kbFiles.length})</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {kbFiles.map(f=>(
              <span key={f.id} style={{fontSize:9,padding:"2px 7px",borderRadius:6,background:P.sf2,color:P.tx2,cursor:"pointer"}}
                onClick={()=>window.open(pdfViewUrl(f.f),"_blank")}>
                📄 {f.f}
              </span>
            ))}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,marginBottom:10,minHeight:200,maxHeight:380,padding:"4px 0"}}>
          {kbChatMsgs.length===0&&(
            <div style={{textAlign:"center",color:P.tx3,fontSize:12,marginTop:40}}>
              <div style={{fontSize:28,marginBottom:8}}>📚</div>
              <div>Pose une question sur le cours <strong style={{color:P.pri}}>{curMat}</strong></div>
              <div style={{fontSize:11,marginTop:4,color:P.tx3}}>Les réponses se basent uniquement sur les PDFs du cours</div>
            </div>
          )}
          {kbChatMsgs.map((m,i)=>(
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start"}}>
              <div style={{
                maxWidth:"85%",padding:"10px 14px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",
                background:m.role==="user"?P.pri:dark?P.sf2:P.sf,
                color:m.role==="user"?"#fff":P.tx,
                fontSize:12,lineHeight:1.6,boxShadow:"0 1px 4px rgba(0,0,0,.08)"
              }}>
                {m.role==="assistant"?<MdRender text={m.text}/>:m.text}
              </div>
              <div style={{fontSize:9,color:P.tx3,marginTop:2,paddingLeft:4,paddingRight:4}}>
                {m.role==="user"?"Vous":"IA — KB uniquement"}
              </div>
            </div>
          ))}
          {kbChatLoading&&(
            <div style={{display:"flex",alignItems:"flex-start"}}>
              <div style={{padding:"10px 14px",borderRadius:"16px 16px 16px 4px",background:dark?P.sf2:P.sf,fontSize:12,color:P.tx2}}>
                <span style={{animation:"pulse 1s infinite"}}>⋯ Recherche dans les cours…</span>
              </div>
            </div>
          )}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
          <textarea
            value={kbChatInput}
            onChange={e=>setKbChatInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Question sur ${curMat}… (Entrée pour envoyer)`}
            rows={2}
            style={{flex:1,padding:"10px 14px",borderRadius:12,border:`1.5px solid ${P.bdr}`,background:dark?P.sf:"#fff",color:P.tx,fontSize:12,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.5}}
          />
          <button onClick={handleSend} disabled={kbChatLoading||!kbChatInput.trim()}
            style={{...btn,padding:"10px 16px",opacity:kbChatLoading||!kbChatInput.trim()?0.5:1}}>
            {kbChatLoading?"…":"↑"}
          </button>
        </div>
        <div style={{fontSize:9,color:P.tx3,marginTop:4,textAlign:"center"}}>
          Basé sur {kbFiles.length} document{kbFiles.length>1?"s":""} · Pas de recherche web
        </div>
      </div>
    );
  };

  // ─── VDeepResearch ───────────────────────────────────────────────────────
  const VDeepResearch=()=>{
    const mats=Object.keys(M);
    const curMat=drMat||mats[0];
    const handleSearch=async()=>{
      const q=drInput.trim();if(!q||drLoading)return;
      setDrInput("");
      setDrMsgs(prev=>[...prev,{role:"user",text:q,mat:curMat}]);
      setDrLoading(true);
      const sys=`Tu es un assistant de recherche juridique expert pour L1 Droit S2 Toulon. Tu utilises la recherche web pour trouver des informations récentes et précises.\n\nPRIORITÉS (dans l'ordre):\n1. Jurisprudence (arrêts, décisions CC, CEDH, Cass., CE) — citer: juridiction, date, numéro\n2. Doctrine juridique (auteurs, manuels, articles de revue) — citer: auteur, œuvre, année\n3. Textes législatifs et réglementaires — citer: article, loi, date\n4. Sources académiques et pédagogiques\n\nFORMAT DE RÉPONSE:\n## [Titre de la réponse]\n\n### Jurisprudence pertinente\n[arrêts avec juridiction + date + portée]\n\n### Doctrine\n[auteurs + ouvrages + thèses]\n\n### Analyse\n[synthèse pédagogique]\n\n### Sources\n[liste numérotée des sources utilisées]\n\nContexte: ${COURSE_CTX[curMat]||"Droit L1 S2"}`;
      try{
        const res=await callAI(sys,q,"deep",curMat,"",true);
        setDrMsgs(prev=>[...prev,{role:"assistant",text:res,mat:curMat}]);
      }catch(e){
        setDrMsgs(prev=>[...prev,{role:"assistant",text:"Erreur : "+e.message,mat:curMat}]);
      }finally{setDrLoading(false);}
    };
    const handleKey=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSearch();}};
    const recentTopics=[
      "Conditions de validité d'un contrat",
      "Hiérarchie des normes en droit français",
      "Régimes matrimoniaux : séparation vs communauté",
      "Responsabilité délictuelle vs contractuelle",
      "Le droit de vote : fondement constitutionnel",
    ];
    return(
      <div style={{display:"flex",flexDirection:"column",height:"100%",minHeight:500}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <h1 style={{fontSize:15,fontWeight:800,color:P.priS,margin:0}}>🔬 Deep Research</h1>
            <div style={{fontSize:10,color:P.tx3,marginTop:2}}>Jurisprudence · Doctrine · Législation — avec recherche web</div>
          </div>
          <button onClick={()=>setDrMsgs([])} style={btnS}>✕ Effacer</button>
        </div>
        <div style={{...card,marginBottom:12,padding:"8px 12px"}}>
          <div style={{fontSize:11,fontWeight:700,color:P.tx3,marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>Matière de contexte</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {mats.map(k=>(
              <button key={k} onClick={()=>setDrMat(k)}
                style={{...btnS,background:curMat===k?M[k].c:"transparent",color:curMat===k?"#fff":P.tx2,borderColor:M[k].c,fontWeight:curMat===k?700:400,fontSize:11}}>
                {k}
              </button>
            ))}
          </div>
        </div>
        {drMsgs.length===0&&(
          <div style={{...card,marginBottom:12,padding:"12px"}}>
            <div style={{fontSize:11,fontWeight:700,color:P.tx3,marginBottom:8}}>💡 Sujets suggérés</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {recentTopics.map((t,i)=>(
                <button key={i} onClick={()=>{setDrInput(t);}} style={{...btnS,textAlign:"left",fontSize:11,padding:"8px 12px",borderRadius:10}}>
                  🔍 {t}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,marginBottom:10,minHeight:180,maxHeight:360,padding:"4px 0"}}>
          {drMsgs.map((m,i)=>(
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start"}}>
              {m.role==="user"?(
                <div style={{maxWidth:"85%",padding:"10px 14px",borderRadius:"16px 16px 4px 16px",background:P.pri,color:"#fff",fontSize:12,lineHeight:1.6}}>
                  {m.text}
                </div>
              ):(
                <div style={{width:"100%"}}>
                  <div style={{...card,borderLeft:`3px solid #6366f1`,padding:"14px 16px"}}>
                    <div style={{fontSize:9,fontWeight:600,color:"#6366f1",marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>
                      🔬 Deep Research · {m.mat} · Jurisprudence + Doctrine
                    </div>
                    <MdRender text={m.text}/>
                  </div>
                </div>
              )}
            </div>
          ))}
          {drLoading&&(
            <div style={{...card,borderLeft:`3px solid #6366f1`,padding:"14px 16px"}}>
              <div style={{fontSize:11,color:P.tx2}}>🔍 Recherche en cours… Jurisprudence · Doctrine · Législation</div>
              <div style={{marginTop:8,display:"flex",gap:4}}>
                {["Jurisprudence","Doctrine","Textes"].map(s=>(
                  <span key={s} style={{fontSize:9,padding:"2px 8px",borderRadius:6,background:P.sf2,color:P.tx3}}>{s}…</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
          <textarea
            value={drInput}
            onChange={e=>setDrInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Question juridique… (jurisprudence, doctrine, législation)"
            rows={2}
            style={{flex:1,padding:"10px 14px",borderRadius:12,border:`1.5px solid ${P.bdr}`,background:dark?P.sf:"#fff",color:P.tx,fontSize:12,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.5}}
          />
          <button onClick={handleSearch} disabled={drLoading||!drInput.trim()}
            style={{...btn,padding:"10px 16px",opacity:drLoading||!drInput.trim()?0.5:1}}>
            {drLoading?"…":"🔬"}
          </button>
        </div>
        <div style={{fontSize:9,color:P.tx3,marginTop:4,textAlign:"center"}}>
          Recherche web activée · Priorité jurisprudence &amp; doctrine
        </div>
      </div>
    );
  };

  // ─── Sidebar ─────────────────────────────────────────────────────────────
  const Sidebar=({onClose})=>{
    const inProgCount=S.inProgress?S.inProgress.filter(e=>e.status==="in_progress").length:0;
    const histCount=S.history?S.history.length:0;
    const flashDue=Object.values(S.flashcards||{}).flat().filter(f=>f.due<=Date.now()).length;
    const navGroups=[
      {label:"Accueil",items:[
        {v:"dash",icon:"🏠",label:"Tableau de bord"},
        {v:"mat",icon:"📚",label:"Matières"},
        {v:"prio",icon:"🎯",label:"Priorités"},
      ]},
      {label:"Entraînement",items:[
        {v:"exo",icon:"✏️",label:"Exercices IA"},
        {v:"inprog",icon:"🔄",label:"En cours",count:inProgCount},
        {v:"flash",icon:"⚡",label:"Flashcards",count:flashDue},
        {v:"qcm",icon:"🎯",label:"QCM"},
      ]},
      {label:"Ressources",items:[
        {v:"ann",icon:"📋",label:"Annales",count:AN.length},
        {v:"meth",icon:"📐",label:"Méthodologie"},
        {v:"kb",icon:"📂",label:"Base de docs"},
        {v:"hist",icon:"🕐",label:"Historique",count:histCount},
      ]},
      {label:"IA & Recherche",items:[
        {v:"kbchat",icon:"💬",label:"Chat KB"},
        {v:"deepresearch",icon:"🔬",label:"Deep Research"},
      ]},
    ];
    return(
      <div style={{
        position:"fixed",top:0,left:0,width:240,height:"100vh",
        background:dark?P.sf:"#fff",
        borderRight:`1px solid ${P.bdr}`,
        zIndex:200,display:"flex",flexDirection:"column",
        boxShadow:"2px 0 20px rgba(0,0,0,.15)",
        overflowY:"auto"
      }}>
        <div style={{padding:"16px 16px 8px",borderBottom:`1px solid ${P.bdr}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontWeight:800,fontSize:14,color:P.pri}}>L1 Droit S2</div>
            <div style={{fontSize:10,color:P.tx3}}>Toulon · 2024-25</div>
          </div>
          <button onClick={onClose} style={{...btnS,padding:"4px 8px",fontSize:16,lineHeight:1}}>✕</button>
        </div>
        <div style={{flex:1,padding:"8px 0",overflowY:"auto"}}>
          {navGroups.map(g=>(
            <div key={g.label} style={{marginBottom:4}}>
              <div style={{fontSize:9,fontWeight:700,color:P.tx3,textTransform:"uppercase",letterSpacing:.8,padding:"8px 16px 4px"}}>
                {g.label}
              </div>
              {g.items.map(it=>(
                <button key={it.v} onClick={()=>{setView(it.v);if(onClose)onClose();}}
                  style={{
                    display:"flex",alignItems:"center",gap:10,width:"100%",
                    padding:"9px 16px",background:view===it.v?(dark?"rgba(198,92,105,.18)":"rgba(198,92,105,.1)"):"transparent",
                    border:"none",cursor:"pointer",borderRadius:0,textAlign:"left",
                    color:view===it.v?P.pri:P.tx,fontWeight:view===it.v?700:400,
                    fontSize:13,fontFamily:"inherit",
                    borderLeft:view===it.v?`3px solid ${P.pri}`:"3px solid transparent",
                    transition:"all .12s"
                  }}>
                  <span style={{fontSize:15,width:20,textAlign:"center"}}>{it.icon}</span>
                  <span style={{flex:1}}>{it.label}</span>
                  {it.count>0&&(
                    <span style={{
                      fontSize:9,fontWeight:700,
                      background:it.v==="inprog"?P.warn:it.v==="flash"?P.warn:(dark?"#3a2535":P.sf2),
                      color:it.v==="inprog"||it.v==="flash"?"#fff":P.tx3,
                      padding:"1px 6px",borderRadius:8,minWidth:16,textAlign:"center"
                    }}>{it.count}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{padding:"12px 16px",borderTop:`1px solid ${P.bdr}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:11,color:P.tx3}}>Thème</span>
            <button onClick={()=>persist({...S,settings:{...S.settings,dark:!dark}})}
              style={{...btnS,padding:"4px 10px",fontSize:11,display:"flex",alignItems:"center",gap:6}}>
              {dark?"☀️ Clair":"🌙 Sombre"}
            </button>
          </div>
          <button onClick={()=>setShowKeys(v=>!v)}
            style={{...btnS,width:"100%",justifyContent:"center",marginBottom:6,fontSize:11}}>
            ⚙️ Clés API IA {showKeys?"▲":"▼"}
          </button>
          {showKeys&&(
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[
                {k:"gemini",label:"Gemini API Key",st:keyGemini,set:(v)=>{setKeyGemini(v);localStorage.setItem("ak_gemini",v);}},
                {k:"groq",label:"Groq API Key",st:keyGroq,set:(v)=>{setKeyGroq(v);localStorage.setItem("ak_groq",v);}},
              ].map(({k,label,st,set})=>(
                <div key={k}>
                  <div style={{fontSize:9,color:P.tx3,marginBottom:2}}>{label}</div>
                  <input type="password" value={st} onChange={e=>set(e.target.value)}
                    placeholder={`sk-... (${k})`}
                    style={{width:"100%",padding:"5px 8px",borderRadius:8,border:`1px solid ${P.bdr}`,background:dark?P.sf2:"#fff",color:P.tx,fontSize:10,fontFamily:"inherit"}}/>
                </div>
              ))}
              <div style={{fontSize:9,color:P.tx3,marginTop:2}}>
                Stockées dans localStorage. Jamais envoyées ailleurs.
              </div>
            </div>
          )}
          <div style={{fontSize:10,color:P.tx3,marginTop:6}}>
            {histCount} corrections · {flashDue} flashcards dues
          </div>
        </div>
      </div>
    );
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  const views={
    dash:<VDash/>,mat:<VMat/>,prio:<VPrio/>,
    exo:<VExo/>,inprog:<VInProgress/>,flash:<VFlash/>,qcm:<VQCM/>,
    ann:<VAnn/>,meth:<VMeth/>,kb:<VKB/>,hist:<VHist/>,
    kbchat:<VKBChat/>,deepresearch:<VDeepResearch/>,
  };

  const globalCSS=`
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:${P.bg};color:${P.tx};transition:background .3s,color .3s;}
    ::-webkit-scrollbar{width:5px;height:5px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:${P.bdr};border-radius:3px;}
    ::-webkit-scrollbar-thumb:hover{background:${P.tx3};}
    textarea:focus,input:focus{outline:none;border-color:${P.pri}!important;}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .view-enter{animation:slideIn .2s ease-out;}
  `;

  const [sideOpen,setSideOpen]=React.useState(false);
  const dueCount=Object.values(S.flashcards||{}).flat().filter(f=>f.due<=Date.now()).length;
  const inProgCount=S.inProgress?.filter(e=>e.status==="in_progress").length||0;

  const viewLabels={
    dash:"Tableau de bord",mat:"Matières",prio:"Priorités",
    exo:"Exercices IA",inprog:"En cours",flash:"Flashcards",qcm:"QCM",
    ann:"Annales",meth:"Méthodologie",kb:"Base de docs",hist:"Historique",
    kbchat:"Chat KB",deepresearch:"Deep Research",
  };

  return(
    <div style={{minHeight:"100vh",background:P.bg,color:P.tx,transition:"background .3s,color .3s"}}>
      <style>{globalCSS}</style>

      {/* Overlay quand sidebar ouverte */}
      {sideOpen&&<div onClick={()=>setSideOpen(false)}
        style={{position:"fixed",inset:0,background:"rgba(0,0,0,.4)",zIndex:199}}/>}

      {/* Sidebar */}
      {sideOpen&&<Sidebar onClose={()=>setSideOpen(false)}/>}

      {/* Top nav */}
      <div style={{
        position:"sticky",top:0,zIndex:100,
        background:dark?"rgba(26,10,11,.92)":"rgba(253,242,242,.92)",
        backdropFilter:"blur(12px)",
        borderBottom:`1px solid ${P.bdr}`,
        padding:"0 16px",height:50,
        display:"flex",alignItems:"center",gap:12,
      }}>
        <button onClick={()=>setSideOpen(s=>!s)} style={{...btnS,padding:"6px 10px",fontSize:18,lineHeight:1}}>☰</button>
        <div style={{flex:1,fontWeight:700,fontSize:13,color:P.pri}}>
          L1 Droit S2 — {viewLabels[view]||view}
        </div>
        {dueCount>0&&(
          <button onClick={()=>setView("flash")} style={{...btnS,fontSize:11,gap:4,display:"flex",alignItems:"center"}}>
            <span style={{background:P.warn,color:"#fff",borderRadius:8,padding:"1px 6px",fontSize:9,fontWeight:700}}>{dueCount}</span>
            ⚡ Flash dues
          </button>
        )}
        {inProgCount>0&&(
          <button onClick={()=>setView("inprog")} style={{...btnS,fontSize:11,gap:4,display:"flex",alignItems:"center"}}>
            <span style={{background:"#f59e0b",color:"#fff",borderRadius:8,padding:"1px 6px",fontSize:9,fontWeight:700}}>{inProgCount}</span>
            🔄 En cours
          </button>
        )}
        <button onClick={()=>persist({...S,settings:{...S.settings,dark:!dark}})} style={{...btnS,padding:"6px 8px",fontSize:14}}>{dark?"☀️":"🌙"}</button>
      </div>

      {/* Bottom nav mobile */}
      <div style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:100,
        background:dark?"rgba(26,10,11,.96)":"rgba(253,242,242,.96)",
        backdropFilter:"blur(12px)",
        borderTop:`1px solid ${P.bdr}`,
        display:"flex",alignItems:"center",
        padding:"4px 0",
        gap:0,
      }}>
        {[
          {v:"dash",icon:"🏠",label:"Accueil"},
          {v:"exo",icon:"✏️",label:"Exercices"},
          {v:"ann",icon:"📋",label:"Annales"},
          {v:"flash",icon:"⚡",label:"Flash"},
          {v:"kbchat",icon:"💬",label:"Chat"},
          {v:"deepresearch",icon:"🔬",label:"Recherche"},
        ].map(it=>(
          <button key={it.v} onClick={()=>setView(it.v)}
            style={{
              flex:1,display:"flex",flexDirection:"column",alignItems:"center",
              padding:"6px 2px",background:"transparent",border:"none",cursor:"pointer",
              color:view===it.v?P.pri:P.tx3,fontFamily:"inherit",
              fontSize:9,fontWeight:view===it.v?700:400,
              transition:"color .12s",
            }}>
            <span style={{fontSize:17,marginBottom:1}}>{it.icon}</span>
            {it.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div style={{
        maxWidth:680,margin:"0 auto",
        padding:"16px 12px 80px",
        minHeight:"calc(100vh - 50px)",
      }} className="view-enter" key={view}>
        {views[view]||<VDash/>}
      </div>
    </div>
  );
};
