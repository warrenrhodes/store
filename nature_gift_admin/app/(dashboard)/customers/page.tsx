import { DataTable } from '@/components/custom-ui/DataTable'
import { columns } from '@/components/customers/CustomerColumns'
import { Separator } from '@/components/ui/separator'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export default async function Customers() {
  const { userId } = await auth()
  const customers = await (
    await prisma
  ).user.findMany({
    where: {
      NOT: {
        clerkId: userId,
      },
    },
  })

  return (
    <div className="sm:px-10 px-2 py-5">
      <p className="text-heading2-bold">Customers</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  )
}

export const dynamic = 'force-dynamic'
