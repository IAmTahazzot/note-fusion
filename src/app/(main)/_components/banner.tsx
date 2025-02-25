'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

interface BannerProps {
  documentId: Id<'documents'>
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter()

  const remove = useMutation(api.myFunctions.remove)
  const restore = useMutation(api.myFunctions.restore)

  const onRemove = () => {
    const promise = remove({ id: documentId })

    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted!',
      error: 'Failed to delete note.',
    })

    router.push('/home')
  }

  const onRestore = () => {
    const promise = restore({ id: documentId })

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restore note.',
    })
  }

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  )
}
