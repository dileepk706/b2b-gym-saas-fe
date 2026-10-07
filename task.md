let arr=['rudra','duaa']

const st1=arr[0]
const st2=arr[1]

let fm=new Map()

for(let i=0;i<st1.length;i++){
fm.set(st1[i],(fm.get(st1[i])||0)+1)
}

for(let i=0;i<st2.length;i++){
if(fm.get(st2[i])){
fm.set(st2[i],fm.get(st2)-1)
}
if(fm.get(st2[i])<0||!fm.get(st2[i])) return false
}

create fm for st 1
itirate st2 and subt the f from fm
if c is not exist or ==0 return false
