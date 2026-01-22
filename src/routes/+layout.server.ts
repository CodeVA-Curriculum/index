export const load = async ({ locals }) => {
  return {
    session: locals.session,
    user: locals.session
  }
}
