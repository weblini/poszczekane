export async function getLoggedInOrganizerName(supabaseClient: SupaClient): Promise<string | null> {
    const { data: { user } } = await supabaseClient.auth.getUser()
    const { data: organizer } = await supabaseClient.from('organizers').select('name').eq('id', user?.id).maybeSingle()
    return organizer?.name || null
}