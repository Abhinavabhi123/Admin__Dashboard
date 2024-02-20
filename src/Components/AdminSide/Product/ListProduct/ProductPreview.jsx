

export default function ProductPreview(Props) {
    const {setShowDetails,data,showDetails} = Props;
    console.log(showDetails,"data");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-15 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg w-[90%] h-[90%]">
        <div className="flex justify-between">
            <h2 className="text-2xl font-medium italic">Product Preview</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={()=>setShowDetails(prevState => ({...prevState, status:false}))}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4">{data.name}</div>
      </div>
    </div>
  )
}
