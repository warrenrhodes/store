import { FormNotice } from '@/components/layout/FormNotice'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getTeam, inviteMember, removeMember } from '@/lib/actions/store.actions'
import { StoreRole } from '@/lib/firebase/models'
import { getStoreContext } from '@/lib/tenant'

export const metadata = { title: 'Team' }

export default async function TeamPage(props: {
  searchParams: Promise<{ saved?: string; error?: string }>
}) {
  const ctx = await getStoreContext()
  if (!ctx) return <p className="text-muted-foreground">No store selected.</p>
  if (ctx.role !== StoreRole.OWNER) {
    return <p className="text-muted-foreground">Only the store owner can manage the team.</p>
  }
  const { saved, error } = await props.searchParams
  const { members, invites } = await getTeam()

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Team</h1>
        <p className="text-sm text-muted-foreground">
          Staff members manage the catalogue and orders. Settings and the team stay with the owner.
        </p>
      </div>
      <FormNotice saved={saved} error={error} />
      <Card>
        <CardHeader>
          <CardTitle>Invite</CardTitle>
          <CardDescription>
            Someone without an admin account joins once they sign up with this email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={inviteMember} className="flex gap-2">
            <Input
              name="email"
              type="email"
              required
              placeholder="email@example.com"
              aria-label="Email"
            />
            <Button type="submit">Invite</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {members.map(m => (
            <div key={m.uid} className="flex items-center justify-between gap-2 py-2">
              <span className="truncate">{m.email ?? m.uid}</span>
              <div className="flex items-center gap-2">
                <Badge variant={m.role === StoreRole.OWNER ? 'default' : 'secondary'}>
                  {m.role}
                </Badge>
                {m.role !== StoreRole.OWNER && (
                  <form action={removeMember}>
                    <input type="hidden" name="uid" value={m.uid} />
                    <Button type="submit" variant="outline" size="sm">
                      Remove
                    </Button>
                  </form>
                )}
              </div>
            </div>
          ))}
          {invites.map(i => (
            <div key={i.email} className="flex items-center justify-between gap-2 py-2">
              <span className="truncate">{i.email}</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">invited</Badge>
                <form action={removeMember}>
                  <input type="hidden" name="email" value={i.email} />
                  <Button type="submit" variant="outline" size="sm">
                    Cancel
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export const dynamic = 'force-dynamic'
