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
 $('#ap').innerHTML=order.map(function(x){return '<button><span>'+esc(x[0])+'</span><b class="'+(x[1]?'hot':'')+'">'+x[1]+'</b></button>'}).join('');
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
