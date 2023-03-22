var onChange = function(id){
    let input=document.getElementById(id.toString()).value;
    if(input.length>1||input==0||input<0)
  document.getElementById(id.toString()).value="";
  };
  var difficulty = function(){
    let input=document.getElementById("dif").value;
    if(input>81||input<0)
  document.getElementById("dif").value=56;
  }
  var getBoard = function(){
    let board=[];
    for(let i=0;i<=8;i++){
      board.push([]);
        for(let j=0;j<=8;j++){
     board[i].push(document.getElementById((i*9+j+1).toString()).value);
        }}
    return board;
  }
  var isValidSudoku = function(board,flag=0){
        let helper=[[]],k=0;
        for(let i=0;i<=board.length-1;i++){
        for(let j=0;j<=board[i].length-1;j++){
     if(board[i][j]!==""){
         helper[k].push(i);
         helper[k].push(j);
    helper[k].push(3*Math.floor((i+1)/3.5)+1+Math.floor((j+1)/3.5));
     helper[k].push(parseInt(board[i][j]));
         helper.push([]);
         k++;
     }
            }
        }
     if(flag){
       let indices = new Set();
          for(let i=0;i<=helper.length-1;i++){
            for(let j=i+1;j<=helper.length-1;j++){
                if((helper[i][3]==helper[j][3]))
                    if((helper[i][1])==(helper[j][1])||(helper[i][2])==(helper[j][2])||(helper[i][0])==(helper[j][0])){
            indices.add(helper[i][0]*9+helper[i][1]+1);   
            indices.add(helper[j][0]*9+helper[j][1]+1);
                    }
                    
                   
                }
        }
       return indices;
     }
        for(let i=0;i<=helper.length-1;i++){
            for(let j=i+1;j<=helper.length-1;j++){
                if((helper[i][3]==helper[j][3]))
                    if((helper[i][1])==(helper[j][1])||(helper[i][2])==(helper[j][2])||(helper[i][0])==(helper[j][0]))
                    return false;
                   
                }
        }
    return true;
    };
  var cellRange = function(board, i,j)
    {  let nums=[];
        for(let k=1; k<=9; k++){
            board[i][j]=k;
    if(isValidSudoku(board)) nums.push(k);
            board[i][j]="";
            }
     return nums;
        };
  var minRange = function(board){
        let min=9, ii, jj,choices;
        for(let i=0;i<=8;i++){
            for(let j=0;j<=8;j++){
                if(board[i][j]===""){ let val=cellRange(board,i,j);
    if(val.length<=min){
    min=val.length;
     ii=i;
        jj=j;
    choices=val;
        }}}}
        if(isEmpty(board)){ ii=Math.floor(Math.random()*9);
  jj=Math.floor(Math.random()*9);
                 return {ii,jj,choices}}
        return {ii, jj, choices};
        };
  var isEmpty=function(board){
            for(let i=0;i<=8;++i)
            for(let j=0;j<=8;++j)
            if(board[i][j]!=="") return false;
            return true;
        }
  var getSetup = function(){
        clearTable();
        let board=getBoard();
        solveSudoku(board);
        let i,j;
        let diff=document.getElementById("dif").value;
    if(!diff) diff=56;
        for(let k=0;k<=80-diff;++k){
            i=Math.floor(Math.random()*9);
            j=Math.floor(Math.random()*9);
            if(board[i][j]!=="") board[i][j]="";
            else --k;
        }
        boardToTable(board, 1);
         
    }
  var solveSudoku= function(board){
        let {ii,jj,choices}=minRange(board);
        if(ii===undefined) return true;
        for(let choice of choices){
            board[ii][jj]=choice.toString();
            if(solveSudoku(board)) return board;
            }
        board[ii][jj]="";
        return false;
            };
  var boardToTable = function(board, flag){
    let sub=board.flat();
    for(let i = 1; i <=81; i++){
      if(flag){
  document.getElementById(i.toString()).value=sub[i-1];
    if(sub[i-1]){
  document.getElementById(i.toString()).disabled=true;
      }}
        else {
  document.getElementById(i.toString()).value=sub[i-1];}}
    };
  var clearTable = function(){
    for(let i = 1; i <=81; i++){
  document.getElementById(i.toString()).value="";
  document.getElementById(i.toString()).disabled=false;
      }
    };
  var solver=function(){
    clearInput();
    let board=getBoard();
    solveSudoku(board);
    boardToTable(board, 0);
  }
  var clearInput = function(){
    for(let i=1;i<=81;++i){
      if(document.getElementById(i.toString()).value!==""&&document.getElementById(i.toString()).disabled==false)
  document.getElementById(i.toString()).value="";
  }
  }
  var checkInput = function(){
    let board=getBoard(), 
     highlight=[];
    let matches=isValidSudoku(board,1);
    if(matches.size!==0)
    for(let index of matches)
     highlight.push(index);
    
    for(let entry of highlight){
      document.getElementById(entry.toString()).style.backgroundColor="red";
    
         setTimeout(()=>{
  document.getElementById(entry.toString()).style.backgroundColor= "#fdffff"
         }, 3500)
    }  
    if(highlight.length==0){
       let cells=document.querySelectorAll("input");
    for(let cell of cells)
      cell.style.backgroundColor="green";
      for(let cell of cells)
         setTimeout(()=>{
  cell.style.backgroundColor= "#fdffff";
         }, 2000)
     }
   }
  