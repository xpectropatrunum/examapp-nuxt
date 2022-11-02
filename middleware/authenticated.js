export default function ({ $auth, redirect }) {

  if (!$auth.user?.phone) {
      return redirect('/')
    }
  }