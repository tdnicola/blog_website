// Fixed star positions - module-level so server and client produce identical CSS
const STARS_SM_VALUES = [
  '45px 78px 0 0 rgba(255,255,255,0.7)',
  '156px 23px 0 0 rgba(255,255,255,0.45)',
  '267px 89px 0 0 rgba(255,255,255,0.8)',
  '412px 134px 0 0 rgba(255,255,255,0.5)',
  '523px 56px 0 0 rgba(255,255,255,0.65)',
  '634px 167px 0 0 rgba(255,255,255,0.4)',
  '745px 34px 0 0 rgba(255,255,255,0.75)',
  '856px 145px 0 0 rgba(255,255,255,0.55)',
  '967px 78px 0 0 rgba(255,255,255,0.8)',
  '1078px 23px 0 0 rgba(255,255,255,0.45)',
  '1189px 167px 0 0 rgba(255,255,255,0.6)',
  '1300px 89px 0 0 rgba(255,255,255,0.8)',
  '1411px 34px 0 0 rgba(255,255,255,0.5)',
  '1522px 145px 0 0 rgba(255,255,255,0.7)',
  '1633px 78px 0 0 rgba(255,255,255,0.45)',
  '1744px 56px 0 0 rgba(255,255,255,0.8)',
  '89px 234px 0 0 rgba(255,255,255,0.6)',
  '200px 312px 0 0 rgba(255,255,255,0.45)',
  '311px 245px 0 0 rgba(255,255,255,0.75)',
  '478px 289px 0 0 rgba(255,255,255,0.5)',
  '589px 334px 0 0 rgba(255,255,255,0.8)',
  '700px 256px 0 0 rgba(255,255,255,0.45)',
  '811px 289px 0 0 rgba(255,255,255,0.65)',
  '922px 312px 0 0 rgba(255,255,255,0.75)',
  '1033px 245px 0 0 rgba(255,255,255,0.5)',
  '1144px 334px 0 0 rgba(255,255,255,0.8)',
  '1255px 278px 0 0 rgba(255,255,255,0.45)',
  '1366px 289px 0 0 rgba(255,255,255,0.65)',
  '1477px 312px 0 0 rgba(255,255,255,0.7)',
  '1588px 256px 0 0 rgba(255,255,255,0.5)',
  '1699px 289px 0 0 rgba(255,255,255,0.8)',
  '1810px 234px 0 0 rgba(255,255,255,0.45)',
  '134px 445px 0 0 rgba(255,255,255,0.6)',
  '245px 478px 0 0 rgba(255,255,255,0.7)',
  '356px 423px 0 0 rgba(255,255,255,0.8)',
  '467px 489px 0 0 rgba(255,255,255,0.5)',
  '578px 412px 0 0 rgba(255,255,255,0.45)',
  '689px 456px 0 0 rgba(255,255,255,0.7)',
  '800px 423px 0 0 rgba(255,255,255,0.65)',
  '911px 489px 0 0 rgba(255,255,255,0.8)',
  '1022px 412px 0 0 rgba(255,255,255,0.5)',
  '1133px 456px 0 0 rgba(255,255,255,0.45)',
  '1244px 423px 0 0 rgba(255,255,255,0.7)',
  '1355px 489px 0 0 rgba(255,255,255,0.6)',
  '1466px 412px 0 0 rgba(255,255,255,0.8)',
  '1577px 456px 0 0 rgba(255,255,255,0.5)',
  '1688px 423px 0 0 rgba(255,255,255,0.45)',
  '1799px 489px 0 0 rgba(255,255,255,0.7)',
  '67px 567px 0 0 rgba(255,255,255,0.6)',
  '178px 589px 0 0 rgba(255,255,255,0.45)',
  '289px 612px 0 0 rgba(255,255,255,0.8)',
  '400px 578px 0 0 rgba(255,255,255,0.55)',
  '511px 634px 0 0 rgba(255,255,255,0.7)',
  '622px 589px 0 0 rgba(255,255,255,0.65)',
  '733px 612px 0 0 rgba(255,255,255,0.45)',
  '844px 578px 0 0 rgba(255,255,255,0.8)',
  '955px 634px 0 0 rgba(255,255,255,0.55)',
  '1066px 589px 0 0 rgba(255,255,255,0.7)',
  '1177px 612px 0 0 rgba(255,255,255,0.65)',
  '1288px 578px 0 0 rgba(255,255,255,0.45)',
  '350px 750px 0 0 rgba(255,255,255,0.8)',
  '780px 820px 0 0 rgba(255,255,255,0.55)',
  '1100px 756px 0 0 rgba(255,255,255,0.7)',
  '1450px 830px 0 0 rgba(255,255,255,0.45)',
  '220px 900px 0 0 rgba(255,255,255,0.65)',
  '660px 940px 0 0 rgba(255,255,255,0.8)',
  '990px 890px 0 0 rgba(255,255,255,0.55)',
  '1320px 960px 0 0 rgba(255,255,255,0.7)',
  '78px 345px 0 0 rgba(255,255,255,0.5)',
  '1560px 390px 0 0 rgba(255,255,255,0.65)',
  '890px 700px 0 0 rgba(255,255,255,0.45)',
  '1700px 650px 0 0 rgba(255,255,255,0.8)',
  '430px 850px 0 0 rgba(255,255,255,0.55)',
  '1230px 810px 0 0 rgba(255,255,255,0.7)',
  '560px 190px 0 0 rgba(255,255,255,0.5)',
  '1380px 520px 0 0 rgba(255,255,255,0.6)',
  '1870px 140px 0 0 rgba(255,255,255,0.7)',
  '30px 680px 0 0 rgba(255,255,255,0.45)',
  '1050px 320px 0 0 rgba(255,255,255,0.6)',
  '740px 860px 0 0 rgba(255,255,255,0.5)',
  '1780px 770px 0 0 rgba(255,255,255,0.7)',
  '110px 490px 0 0 rgba(255,255,255,0.45)',
]

const STARS_LG_VALUES = [
  '320px 145px 0 1px rgba(255,255,255,0.95)',
  '870px 67px 0 1px rgba(255,255,255,0.85)',
  '1450px 234px 0 1px rgba(255,255,255,0.95)',
  '678px 512px 0 1px rgba(255,255,255,0.8)',
  '1120px 445px 0 1px rgba(255,255,255,0.95)',
  '230px 720px 0 1px rgba(255,255,255,0.85)',
  '1650px 380px 0 1px rgba(255,255,255,0.9)',
  '990px 190px 0 1px rgba(255,255,255,0.8)',
  '480px 60px 0 1px rgba(255,255,255,0.9)',
  '1300px 680px 0 1px rgba(255,255,255,0.85)',
]

export const STARS_SM = STARS_SM_VALUES.join(', ')
export const STARS_LG = STARS_LG_VALUES.join(', ')

export const STAR_CSS = `
  .sp-stars-sm { will-change: transform; transition: transform 0.18s ease-out; }
  .sp-stars-sm::before {
    content: ''; position: fixed; top: 0; left: 0;
    width: 1px; height: 1px; border-radius: 50%;
    box-shadow: ${STARS_SM}; pointer-events: none;
  }

  .sp-stars-lg { will-change: transform; transition: transform 0.12s ease-out; }
  .sp-stars-lg::after {
    content: ''; position: fixed; top: 0; left: 0;
    width: 2px; height: 2px; border-radius: 50%;
    box-shadow: ${STARS_LG};
    animation: sp-twinkle 5s ease-in-out infinite; pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .sp-stars-sm, .sp-stars-lg { transition: none; }
    .sp-stars-lg::after { animation: none; }
  }
`
