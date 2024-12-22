import React, { useEffect, useState } from 'react'
import NoteCard from '../../components/cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNote from './AddEditNote'
import Modal from 'react-modal'
import axiosInstance from '../../utils/axiosInstance'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteNote, fetchNoteById, fetchNotes } from '../../api/notes'
import ConfirmModal from '../../components/showConfirmAlert/ConfirmModal'
import Paginate from '../../components/pagination/Paginate'

const Home = () => {
	const queryClient = useQueryClient();

	const [openAddEditModal, setOpenAddEditModal] = useState({
		isShow : false,
		type : 'add',
		data : null
	});
	const [editItemId, setEditItemId] = useState(null);
	const [deleteItemId, setDeleteItemId] = useState(null);
	const [showConfirm, setShowConfirm] = useState(false);
	const [page, setPage] = useState(1);

	const addNoteHandler = () => {
		setOpenAddEditModal({
			...openAddEditModal,
			isShow: true
			
		})
	}
	const onEdit = (id) => {
		console.log("on edit",id);
		setEditItemId(id);
	}
	const onDelete = (id) => {
		console.log("onDelete",id)
		setShowConfirm(true);
		setDeleteItemId(id);
	}
	const deleteMutation = useMutation({
		mutationFn: deleteNote,
		onSuccess: () => {
			queryClient.invalidateQueries(['notes']);
		},
		onError: (error) => {
			console.error('Mutation failed:', error);
		},
	})
	const handleOnCloseConfirm=()=>{
		setShowConfirm(false);
		setDeleteItemId(null);
	}

	const onConfirmDeleteHandler = ()=>{
		console.log("handleOnCloseConfirm")
		deleteMutation.mutate(deleteItemId)
		setShowConfirm(false);
	}

	const onPinNote = () => {
		console.log("onPinNote")
	}
	const onClose = () => {
		setEditItemId(null);
		setOpenAddEditModal({
			isShow: false,
			type:'add',
			data:null
			
		})
	}

	const { isPending, isError, data, isFetching, error } = useQuery({
        queryKey: ['notes',page],
        queryFn: ({queryKey})=>fetchNotes(queryKey[1]),
    })
	const { data:note } = useQuery({
		queryKey: ['note',editItemId],
		queryFn: ({queryKey})=>fetchNoteById(queryKey[1]),
		enabled: !!editItemId,
	});

	useEffect(()=>{
		if(note?.data){
			setOpenAddEditModal({
				type: 'edit',
				isShow: true,
				data: note?.data, 
			});
		}
	},[note])
	
	// console.log("note home",data?.data.pageCount)

	return (
		<>
			<div className='container mx-auto px-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-8'>
				{
					data?.data.notes.map(note=>(
						<NoteCard 
						key={note._id}
						id={note._id}
						title={note.title}
						date={note.updatedAt}
						content={note.content}
						tags={'#text'}
						isPinned={note.isPinned}
						onEdit={onEdit}
						onDelete={onDelete}
						onPinNote={onPinNote}/>
					))
				}
						
			</div>

			{/* <div className="pagination">
				<button 
				onClick={() => setPage(data?.data.page - 1)} 
				disabled={data?.data.page === 1}
				>
				Previous
				</button>
				
				<span>{data?.data.page} / {data?.data.pageCount}</span>
				
				<button 
				onClick={() => setPage(page + 1)} 
				disabled={data?.data.page === data?.data.pageCount}
				>
				Next
				</button>
			</div> */}
			{
				data?.data.pageCount > 1 &&
				<Paginate page={data?.data.page}pageCount={data?.data.pageCount} setPage={setPage}/>
			}
			

			<button type='button' className='h-12 w-12 flex justify-center items-center rounded-2xl bg-primary hover:bg-blue-900 absolute right-10 bottom-10' onClick={addNoteHandler}>
				<MdAdd className='text-2xl text-white'/>
			</button>

			<Modal
				isOpen={openAddEditModal.isShow}
				// ariaHideApp={false}
				onRequestClose={()=>{}}
				style={{
					overlay: {
						backgroundColor:"rgba(0,0,0,0.2)"
					},
				}}
				contentLabel=""
				className="w-[40%]  bg-white  rounded-md mx-auto mt-14 p-5 "
			>
				<AddEditNote onClose={onClose} openAddEditModal={openAddEditModal}/>
			</Modal>

			<ConfirmModal showConfirm={showConfirm} 
						onClose={handleOnCloseConfirm} 
						onConfirm={onConfirmDeleteHandler}/>

		</>


	)
}

export default Home