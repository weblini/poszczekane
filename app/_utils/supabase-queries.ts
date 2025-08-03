export async function getLoggedInOrganizerName(supabaseClient: SupaClient): Promise<string | null> {
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
        return null
    }
    
    const { data: organizer } = await supabaseClient.from('organizers').select('name, user_id').eq('user_id', user.id).maybeSingle()
    return organizer?.name || null
}