

export default function AiStateCards ( 
   { id,
    title,
    description
}){
  
  return (
       <div className="bg-white border-slate-200 rounded-2xl p-5 shadow-sm ">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mb-4">
            {id}
        </div>
        <h2 className="font-bold text-slate-800 text-lg mb-1">
            {title}
        </h2>
        <p className="tet-sm text-slate-500 leading-6">
            {description}
        </p>
        </div>     
  )
}


