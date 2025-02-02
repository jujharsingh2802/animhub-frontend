import React from 'react'

function Editor({ initialValue, onCancel, onSave}) {
    const [editorState, setEditorState] = useState(initialValue);

    const handleSubmit = () => {
        onSave(editorState);
    }
  return (
    <div className=' w-full text-sm'>
        <input
            className='w-full bg-[#0F0F0F] p-2 border border-gray-300 rounded-lg'
            value={editorState}
            autoFocus
            onChange={(e) => setEditorState(e.target.value)}
        />
        <div className=' space-x-4 mt-3 w-3/4 inline-flex justify-end items-center'>
            <span className=' bg-[#1b1b1b] py-1 px-3 font-normal rounded-lg hover:bg-black cursor-pointer ' onClick={onCancel}>
                Cancel  
            </span>
            <button className=' bg-blue-400 font-normal text-black hover:bg-blue-500 cursor-pointer'>Save</button>
        </div>

    </div>
  )
}

export default Editor