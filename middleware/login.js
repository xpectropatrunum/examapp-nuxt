export default function ({ $auth, redirect }) {

  if ($auth.user?.phone > 0) {
      return redirect('/panel/dashboard')
    }
  }