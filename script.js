var S={m:{},get:function(k,d){try{var v=localStorage.getItem('np_'+k);if(v)return JSON.parse(v)}catch(e){}return S.m[k]!==undefined?S.m[k]:d},set:function(k,v){S.m[k]=v;try{localStorage.setItem('np_'+k,JSON.stringify(v))}catch(e){}}};
var $=function(s){return document.querySelector(s)};
var toast=function(m){var t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove('on')},1800)};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

/* 업무바로가기 */
var quick=['나이스 원격지원','메모작성','내부메일작성','접사접수','지출품의','문서작성','사업관리카드','나이스 사용자…'];
var qi=['🛠','📝','✉','📥','💳','📄','🗂','👤'];
$('#quick').innerHTML=quick.map(function(q,i){return '<button data-q="'+esc(q)+'">'+qi[i]+' '+esc(q)+'</button>'}).join('');
$('#quick').onclick=function(e){var b=e.target.closest('button');if(b)toast(b.dataset.q+' 열기')};

/* 시스템 탭 */
var systems={
 '나이스':{sub:'나이스 업무의 시작',title:'나이스 승인사항',ap:[['상신함',0],['예결함',0],['미결/협조함',0],['기결함',0],['공람함',0],['반려함',7],['예시지함',0]]},
 'K-에듀파인':{sub:'K-에듀파인 업무의 시작',title:'K-에듀파인 승인사항',ap:[['상신함',2],['예결함',1],['미결/협조함',3],['기결함',0],['공람함',4],['반려함',0],['예시지함',0]]},
 '기록관리시스템':{sub:'기록물 관리의 시작',title:'기록관리 처리사항',ap:[['접수대기',1],['분류대기',0],['이관대기',0],['열람신청',2],['폐기대기',0],['반려함',0],['예시지함',0]]},
 '교육정보통계':{sub:'교육통계의 시작',title:'교육정보통계 처리사항',ap:[['조사대기',3],['검증대기',0],['승인대기',1],['반려함',0],['기결함',5],['공람함',0],['예시지함',0]]},
 '예산정보지원시스템':{sub:'예산 업무의 시작',title:'예산 처리사항',ap:[['요구대기',0],['심의대기',2],['배정대기',0],['집행대기',1],['기결함',0],['반려함',0],['예시지함',0]]}
};
var cur='나이스';
function drawSys(){
 $('#sys').innerHTML=Object.keys(systems).map(function(k){return '<button role="tab" aria-selected="'+(k===cur)+'" data-k="'+esc(k)+'">'+esc(k)+'</button>'}).join('');
 var s=systems[cur];$('#heroSub').textContent=s.sub;$('#apTitle').textContent=s.title;
 var a=s.ap,half=Math.ceil(a.length/2),order=[];
 for(var i=0;i<half;i++){order.push(a[i]);if(a[i+half])order.push(a[i+half])}
 $('#ap').innerHTML=order.map(function(x){return apBtn(x)}).join('');
}
var KEDU='https://kyungnam-task-portal.vercel.app/';
$('#sys').onclick=function(e){var b=e.target.closest('button');if(!b)return;
 if(b.dataset.k==='K-에듀파인'){var w=window.open(KEDU,'_blank','noopener');if(!w)toast('팝업이 차단되었습니다. 팝업을 허용해 주세요');return}
 cur=b.dataset.k;drawSys()};
$('#rf').onclick=function(){drawSys();toast('새로고침 완료')};
$('#ap').onclick=function(e){var b=e.target.closest('button');if(b)toast(b.firstChild.textContent+' 열기')};
drawSys();

/* 공지사항 */
var notices=[
 ['업무포털','n0','교무업무영역 수정사항 안내(6.22.기준)','2023-06-23','업무포털'],
 ['업무포털','n0','06.22. 기준 질의응답 안내','2023-06-22','업무포털'],
 ['K-에듀파인','k','4세대 지능형나이스 연계 작업으로 인한 K-에듀파인 접속 제한 안내','2023-06-21','K-에듀파인'],
 ['업무포털','n0','[복무] 연가 잔여일수','2023-06-19','업무포털'],
 ['나이스','n','나이스 정기 점검 일정 안내','2023-06-16','나이스']
];
var fl='전체';
function drawN(){
 var f=['전체','나이스','K-에듀파인','업무포털'];
 $('#flt').innerHTML=f.map(function(x){return '<button aria-pressed="'+(x===fl)+'" data-f="'+x+'">'+x+'</button>'}).join('')+'<a href="#" id="more">more +</a>';
 var l=notices.filter(function(n){return fl==='전체'||n[4]===fl}).slice(0,4);
 $('#nl').innerHTML=l.length?l.map(function(n){return '<li><span class="tag '+(n[1]==='k'?'k':n[1]==='n'?'n':'')+'">'+esc(n[0])+'</span><a>'+esc(n[2])+'</a><span class="date">'+n[3]+'</span></li>'}).join(''):'<li class="todo-empty" style="display:block;width:100%">공지가 없습니다.</li>';
}
$('#flt').onclick=function(e){e.preventDefault();var b=e.target.closest('button');if(b){fl=b.dataset.f;drawN()}else if(e.target.id==='more')toast('공지사항 전체 보기')};
$('#nl').onclick=function(e){var a=e.target.closest('a');if(a)toast(a.textContent.slice(0,24)+'…')};
drawN();

/* 오류/개선 */
function simple(id,rows){$(id).innerHTML=rows.map(function(r){return '<li><a>'+esc(r[0])+'</a><span class="date">'+r[1]+'</span></li>'}).join('')}
simple('#el',[['06.22. 기준 질의응답 안내','2023-06-22'],['[복무] 연가 잔여일수','2023-06-19']]);
simple('#il',[['교무업무영역 수정사항 안내(6.22.기준)','2023-06-23']]);
document.querySelectorAll('.mr').forEach(function(a){a.onclick=function(e){e.preventDefault();toast('목록 전체 보기')}});
document.querySelectorAll('.card ul.list a').forEach(function(a){a.onclick=function(){toast(a.textContent)}});

/* 탭: 공지 / 나의할일 */
var todos=[];
function drawT(){
 $('#tl').innerHTML=todos.map(function(t,i){return '<li><label style="flex:1"><input type="checkbox" data-i="'+i+'"> '+esc(t)+'</label></li>'}).join('');
 $('#te').hidden=todos.length>0;$('#todoN').textContent=todos.length;
}
document.querySelectorAll('.tabs button').forEach(function(b){b.onclick=function(){
 document.querySelectorAll('.tabs button').forEach(function(x){x.setAttribute('aria-selected',x===b)});
 var t=b.dataset.t==='todo';$('#todoView').hidden=!t;$('#noticeView').hidden=t;
}});
$('#ta').onclick=function(){var v=$('#ti').value.trim();if(v){todos.push(v);$('#ti').value='';drawT()}};
$('#ti').onkeydown=function(e){if(e.key==='Enter')$('#ta').click()};
$('#tl').onchange=function(e){var i=e.target.dataset.i;if(i!=null){todos.splice(+i,1);drawT();toast('완료 처리')}};
drawT();

/* 사이드바 */
$('#fold').onclick=function(){var c=$('#side').classList.toggle('closed');$('#fold').textContent=c?'›':'‹'};
if(innerWidth<900){$('#side').classList.add('closed');$('#fold').textContent='›'}

/* 자동 로그아웃 타이머 */
var sec=58*60+57;
setInterval(function(){if(sec>0)sec--;$('#tm').textContent=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')},1000);
$('#ext').onclick=function(){sec=60*60;toast('로그인 시간이 연장되었습니다')};

/* 검색 / 글꼴 / 테마 */
$('#go').onclick=function(){var v=$('#q').value.trim();toast(v?'‘'+v+'’ 검색':'검색어를 입력하세요')};
$('#q').onkeydown=function(e){if(e.key==='Enter')$('#go').click()};
var fs=14;function setFs(n){fs=Math.max(11,Math.min(20,n));document.body.style.setProperty('--fs',fs+'px')}
$('#fp').onclick=function(){setFs(fs+1)};$('#fm').onclick=function(){setFs(fs-1)};$('#f0').onclick=function(){setFs(14)};
$('#dk').onclick=function(){var r=document.documentElement,d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=d?'light':'dark'};

/* ===== 실사용 기능 ===== */
var md=document.createElement('div');md.className='md';md.hidden=true;
md.innerHTML='<div class="box" role="dialog" aria-modal="true"><div class="bh"><b id="mt"></b><button id="mx" aria-label="닫기">✕</button></div><div id="mb"></div></div>';
document.body.appendChild(md);
function openM(t,h){$('#mt').textContent=t;$('#mb').innerHTML=h;$('#mb').onclick=null;md.hidden=false}
function closeM(){md.hidden=true}
$('#mx').onclick=closeM;md.onclick=function(e){if(e.target===md)closeM()};
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeM()});
var fmt=function(n){return Number(n||0).toLocaleString('ko-KR')};
var today=function(){return new Date().toISOString().slice(0,10)};
var d0='2023-06-01';

function sub(t){var s=S.get('sub',[]);s.push({t:t,d:today()});S.set('sub',s);drawSys();toast('상신함에 등록되었습니다')}
function apBtn(x){var c=x[1]+(x[0]==='상신함'?S.get('sub',[]).length:0);return '<button><span>'+esc(x[0])+'</span><b class="'+(c?'hot':'')+'">'+c+'</b></button>'}
function openSub(){var s=S.get('sub',[]);
 openM('상신함',s.length?'<ul class="list">'+s.map(function(x,i){return '<li class="tli"><div style="flex:1">'+esc(x.t)+'<br><span class="sm">'+x.d+'</span></div><button data-r="'+i+'">회수</button></li>'}).join('')+'</ul>':'<div class="todo-empty">상신한 문서가 없습니다.</div>');
 $('#mb').onclick=function(e){var b=e.target.closest('button');if(b&&b.dataset.r!==undefined){s.splice(+b.dataset.r,1);S.set('sub',s);drawSys();openSub()}}}
$('#ap').onclick=function(e){var b=e.target.closest('button');if(!b)return;var n=b.firstChild.textContent,c=b.lastChild.textContent;if(n==='상신함')openSub();else toast(n+(c==='0'?' — 문서가 없습니다':' — '+c+'건'))};

/* 업무바로가기 도구 */
var cp=function(i){try{navigator.clipboard.writeText(i.title+'\n\n'+i.body).then(function(){toast('복사되었습니다')},function(){toast('복사할 수 없습니다')})}catch(e){toast('복사할 수 없습니다')}};
var TOOLS={
 '메모작성':{k:'memo',r:'title',f:[['title','제목','text'],['body','내용','area']],
  line:function(i){return '<b>'+esc(i.title)+'</b><br><span class="sm">'+esc(i.body)+' · '+i.d+'</span>'},acts:[['복사',cp]]},
 '내부메일작성':{k:'mail',r:'title',f:[['to','받는 사람(이메일)','text'],['title','제목','text'],['body','내용','area']],
  line:function(i){return '<b>'+esc(i.title)+'</b> <span class="sm">→ '+esc(i.to)+' · '+i.d+'</span><br><span class="sm">'+esc(i.body)+'</span>'},
  acts:[['메일앱으로',function(i){window.open('mailto:'+encodeURIComponent(i.to)+'?subject='+encodeURIComponent(i.title)+'&body='+encodeURIComponent(i.body))}]]},
 '접사접수':{k:'recv',r:'title',def:{st:'접수대기'},f:[['title','건명','text'],['from','발신처','text'],['kind','구분','select',['공문','민원','일반']]],
  line:function(i){return '<b>'+esc(i.title)+'</b> <span class="pill">'+i.st+'</span><br><span class="sm">'+i.kind+' · '+esc(i.from)+' · '+i.d+'</span>'},
  acts:[['접수완료',function(i){i.st='접수완료'}]]},
 '지출품의':{k:'exp',r:'title',f:[['title','건명','text'],['amt','금액(원)','number'],['date','지출예정일','date'],['body','사유','area']],
  sum:function(L){return '<div class="sm" style="margin-bottom:6px">합계 <b>'+fmt(L.reduce(function(a,i){return a+(+i.amt||0)},0))+'원</b> · '+L.length+'건</div>'},
  line:function(i){return '<b>'+esc(i.title)+'</b> <span class="pill">'+fmt(i.amt)+'원</span>'+(i.sb?' <span class="pill">상신됨</span>':'')+'<br><span class="sm">'+(i.date||i.d)+' · '+esc(i.body)+'</span>'},
  acts:[['상신',function(i){if(!i.sb){i.sb=1;sub('[지출품의] '+i.title)}}]]},
 '문서작성':{k:'doc',r:'title',f:[['title','제목','text'],['body','본문','area']],
  line:function(i){return '<b>'+esc(i.title)+'</b>'+(i.sb?' <span class="pill">상신됨</span>':'')+'<br><span class="sm">'+esc(i.body)+' · '+i.d+'</span>'},
  acts:[['상신',function(i){if(!i.sb){i.sb=1;sub('[문서] '+i.title)}}],['복사',cp]]},
 '사업관리카드':{k:'proj',r:'title',def:{},f:[['title','사업명','text'],['amt','예산(원)','number'],['pg','진행률(%)','range']],
  seed:[{title:'학교 체육관 보수',amt:'12000000',pg:'40',d:d0},{title:'방과후학교 운영',amt:'8500000',pg:'70',d:d0}],
  line:function(i){return '<b>'+esc(i.title)+'</b> <span class="sm">예산 '+fmt(i.amt)+'원 · '+i.pg+'%</span><div class="bar"><i style="width:'+i.pg+'%"></i></div>'},
  acts:[['+10%',function(i){i.pg=String(Math.min(100,+i.pg+10))}],['−10%',function(i){i.pg=String(Math.max(0,+i.pg-10))}]]},
 '나이스 원격지원':{k:'remote',r:'body',def:{st:'접수됨'},f:[['kind','구분','select',['접속 오류','화면 공유','권한 문의','기타']],['body','증상','area'],['tel','연락처','text']],
  line:function(i){return '<b>'+i.kind+'</b> <span class="pill">'+i.st+'</span><br><span class="sm">'+esc(i.body)+' · '+esc(i.tel)+' · '+i.d+'</span>'},
  acts:[['처리완료',function(i){i.st='처리완료'}]]},
 '나이스 사용자…':{k:'users',r:'name',s:1,f:[['name','이름','text'],['org','소속','text'],['tel','연락처','text']],
  seed:[{name:'김민준',org:'교무부',tel:'055-210-0101',d:d0},{name:'이서연',org:'행정실',tel:'055-210-0102',d:d0},{name:'박지후',org:'3학년부',tel:'055-210-0103',d:d0},{name:'최하윤',org:'정보부',tel:'055-210-0104',d:d0}],
  line:function(i){return '<b>'+esc(i.name)+'</b> <span class="sm">'+esc(i.org)+' · '+esc(i.tel)+'</span>'}}
};
function openTool(name,pre){
 var T=TOOLS[name],L=S.get(T.k,T.seed||[]),q=pre||'';
 var form='<form class="tf" autocomplete="off">'+T.f.map(function(f){var id='f_'+f[0];
  if(f[2]==='area')return '<label>'+f[1]+'<textarea id="'+id+'" rows="3"></textarea></label>';
  if(f[2]==='select')return '<label>'+f[1]+'<select id="'+id+'">'+f[3].map(function(o){return '<option>'+o+'</option>'}).join('')+'</select></label>';
  return '<label>'+f[1]+'<input id="'+id+'" type="'+f[2]+'"'+(f[2]==='range'?' min="0" max="100" value="0"':'')+'></label>'}).join('')+'<button type="submit" class="pri">저장</button></form>';
 openM(name,form+(T.s?'<input id="sq" class="sq" placeholder="검색" value="'+esc(q)+'" style="margin-bottom:8px">':'')+'<div id="sum"></div><ul class="list" id="tlist"></ul>');
 function draw(){
  var rows=L.map(function(i,x){return [i,x]}).filter(function(r){return !q||JSON.stringify(r[0]).indexOf(q)>-1});
  $('#sum').innerHTML=T.sum?T.sum(L):'';
  $('#tlist').innerHTML=rows.length?rows.map(function(r){return '<li class="tli"><div style="flex:1;min-width:0">'+T.line(r[0])+'</div><div class="ac">'+(T.acts||[]).map(function(a,n){return '<button data-a="'+n+'" data-x="'+r[1]+'">'+a[0]+'</button>'}).join('')+'<button data-d="'+r[1]+'">삭제</button></div></li>'}).join(''):'<li class="todo-empty" style="display:block;width:100%">내용이 없습니다.</li>';
 }
 draw();
 $('#mb form').onsubmit=function(e){e.preventDefault();
  if(!$('#f_'+T.r).value.trim()){toast('필수 항목을 입력하세요');return}
  var o=Object.assign({d:today()},T.def||{});T.f.forEach(function(f){o[f[0]]=$('#f_'+f[0]).value});
  L.unshift(o);S.set(T.k,L);this.reset();draw();toast('저장되었습니다')};
 $('#tlist').onclick=function(e){var b=e.target.closest('button');if(!b)return;
  if(b.dataset.d!==undefined)L.splice(+b.dataset.d,1);else T.acts[+b.dataset.a][1](L[+b.dataset.x]);
  S.set(T.k,L);draw()};
 if(T.s)$('#sq').oninput=function(){q=this.value;draw()};
}
$('#quick').onclick=function(e){var b=e.target.closest('button');if(b)openTool(b.dataset.q)};
$('#go').onclick=function(){openTool('나이스 사용자…',$('#q').value.trim())};

/* 공지 / 오류 / 개선 게시판 */
var CLS={'나이스':'n','K-에듀파인':'k','업무포털':'n0'};
notices=S.get('notices',notices);
var errs=S.get('errs',[['06.22. 기준 질의응답 안내','2023-06-22',''],['[복무] 연가 잔여일수','2023-06-19','']]);
var imps=S.get('imps',[['교무업무영역 수정사항 안내(6.22.기준)','2023-06-23','']]);
var B={
 notice:{n:'공지사항',get:function(){return notices},set:function(v){notices=v;S.set('notices',v);drawN()},t:2,d:3,b:5,cat:1,mk:function(t,b,c){return [c,CLS[c],t,today(),c,b]}},
 err:{n:'나이스 오류사항 안내',get:function(){return errs},set:function(v){errs=v;S.set('errs',v);drawSide()},t:0,d:1,b:2,mk:function(t,b){return [t,today(),b]}},
 imp:{n:'나이스 개선사항 안내',get:function(){return imps},set:function(v){imps=v;S.set('imps',v);drawSide()},t:0,d:1,b:2,mk:function(t,b){return [t,today(),b]}}
};
function board(k){var c=B[k],L=c.get();
 openM(c.n,'<form class="tf" autocomplete="off"><label>제목<input id="bt"></label>'+(c.cat?'<label>구분<select id="bc"><option>업무포털</option><option>나이스</option><option>K-에듀파인</option></select></label>':'')+'<label>내용<textarea id="bb" rows="3"></textarea></label><button type="submit" class="pri">글 등록</button></form><ul class="list" id="bl"></ul>');
 $('#bl').innerHTML=L.map(function(n,i){return '<li><a data-i="'+i+'">'+esc(n[c.t])+'</a><span class="date">'+n[c.d]+'</span></li>'}).join('')||'<li class="todo-empty" style="display:block;width:100%">등록된 글이 없습니다.</li>';
 $('#mb form').onsubmit=function(e){e.preventDefault();var t=$('#bt').value.trim();if(!t){toast('제목을 입력하세요');return}L.unshift(c.mk(t,$('#bb').value,c.cat?$('#bc').value:0));c.set(L);board(k)};
 $('#bl').onclick=function(e){var a=e.target.closest('a');if(a)detail(k,+a.dataset.i)}}
function detail(k,i){var c=B[k],L=c.get(),n=L[i];
 openM(c.n,'<h4 style="margin:0 0 4px">'+esc(n[c.t])+'</h4><div class="sm">'+n[c.d]+'</div><p style="white-space:pre-wrap">'+esc(n[c.b]||'상세 내용이 없습니다.')+'</p><button id="bk">← 목록</button> <button id="bdl">삭제</button>');
 $('#bk').onclick=function(){board(k)};$('#bdl').onclick=function(){L.splice(i,1);c.set(L);board(k)}}
$('#flt').onclick=function(e){e.preventDefault();var b=e.target.closest('button');if(b){fl=b.dataset.f;drawN()}else if(e.target.id==='more')board('notice')};
$('#nl').onclick=function(e){var a=e.target.closest('a');if(!a)return;var i=notices.findIndex(function(n){return n[2]===a.textContent});if(i>-1)detail('notice',i)};
function drawSide(){[['#el',errs,'err'],['#il',imps,'imp']].forEach(function(x){
 $(x[0]).innerHTML=x[1].slice(0,4).map(function(n,i){return '<li><a data-i="'+i+'">'+esc(n[0])+'</a><span class="date">'+n[1]+'</span></li>'}).join('')||'<li class="date">등록된 글이 없습니다.</li>';
 $(x[0]).onclick=function(e){var a=e.target.closest('a');if(a)detail(x[2],+a.dataset.i)}})}
var mr=document.querySelectorAll('.mr');
mr[0].onclick=function(e){e.preventDefault();board('err')};mr[1].onclick=function(e){e.preventDefault();board('imp')};
drawN();drawSide();

/* 나의할일 저장 */
var _dt=drawT;drawT=function(){S.set('todos',todos);_dt()};
todos=S.get('todos',[]);drawT();

/* 내 정보 */
var P0={n:'6-1',o:''};
function drawMe(){var p=S.get('me',P0);$('.me b').textContent=p.n+' 선생님';$('.me small').textContent=p.o;$('.av').textContent=p.n.charAt(0)}
$('.me').style.cursor='pointer';$('.me').title='눌러서 내 정보 수정';
$('.me').onclick=function(){var p=S.get('me',P0);
 openM('내 정보','<form class="tf"><label>이름<input id="mn" value="'+esc(p.n)+'"></label><label>소속<input id="mo" value="'+esc(p.o)+'"></label><button type="submit" class="pri">저장</button></form>');
 $('#mb form').onsubmit=function(e){e.preventDefault();S.set('me',{n:$('#mn').value.trim()||p.n,o:$('#mo').value});drawMe();closeM()}};
drawMe();
