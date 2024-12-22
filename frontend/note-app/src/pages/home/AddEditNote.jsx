import React, { useEffect, useState } from 'react'
import TagInput from '../../components/inputs/TagInput'
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from '../../utils/validations';
import ShowMessage from '../../components/showMessage/ShowMessage';
import { MdClose } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveNote, updateNote } from '../../api/notes';

const AddEditNote = ({onClose,openAddEditModal}) => {
	
	const queryClient = useQueryClient();
    const [tags, setTags] = useState([]);
	const methods = useForm();
	const defaultValues = {
		title:openAddEditModal?.data?.title || '',
		content: openAddEditModal?.data?.content || ''
	};
	//console.log("defaultValues",defaultValues)

	const { register, 
		handleSubmit,
		setError,
		reset,
		formState: {errors, isSubmitting} } = useForm({
			defaultValues,
			resolver:zodResolver(noteSchema)
		});
	
	const saveMutation = useMutation({
		mutationFn: saveNote,
		onSuccess: () => {
			queryClient.invalidateQueries(['notes']);
		},
		onError: (error) => {
			setError('apiError',{
				type: error.response.status,
				message: error.response.data.message
			})
			},
	})

	const updateMutation = useMutation({
		mutationFn: updateNote,
		onSuccess: () => {
			queryClient.invalidateQueries(['notes']);
		},
		onError: (error) => {
			setError('apiError',{
				type: error.response.status,
				message: error.response.data.message
			})
			},
	})

	const onSubmit = (data) => {
		console.log("data",data)
		console.log(openAddEditModal)
		if(openAddEditModal.type === 'add')
		{
			saveMutation.mutate(data)
		} else {
			updateMutation.mutate({id:openAddEditModal.data._id,data})
		}
		onClose();
	}

	useEffect(() => {
		if (openAddEditModal?.type === 'edit' && openAddEditModal?.data) {
		  reset(openAddEditModal.data); 
		}
	}, [openAddEditModal, reset]);

	return (
		<div className='relative'>
			<button type='button' className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
				<MdClose className='text-xl text-slate-400'/>
			</button>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-2'>
						<label className='input-label'>TITLE</label>
						<input type='text'
							className='text-lg text-slate-950 outline-none bg-slate-100 p-2 rounded-md'
							placeholder='home run'
							{...register("title")} 
							/>
						{
							errors.title && <ShowMessage message={errors.title.message} flag={"error"}/>
						}
					</div>

					<div className='flex flex-col gap-2 mt-4'>
						<label className='input-label'>CONTENT</label>
						<textarea type='text'
							{...register("content")} 
							className='text-lg text-slate-950 outline-none bg-slate-100 p-2 rounded-md'
							placeholder='home run' rows={5}></textarea>
						{
							errors.content && <ShowMessage message={errors.content.message} flag={"error"}/>
						}
					</div>

					{/* <div className='mt-3'>
						<label className='input-label'>TAGS</label>
						<TagInput tags={tags} setTags={setTags}/>
						{
							errors.tags && <ShowMessage message={errors.tags.message} flag={"error"}/>
						}
					</div> */}

					<button type='submit' className='font-medium p-3 mt-5 btn-primary'>ADD</button>
				</form>
			</FormProvider>
		</div>
	)
}

export default AddEditNote