export function getFriendlyAuthErrorMessage(error: any): string {
  const errorCode = error.code;

  switch (errorCode) {
    case 'auth/email-already-in-use':
      return "Hey there 👋 That email's already linked to an account. Try logging in instead?";
    case 'auth/invalid-email':
      return "Hmm... that doesn't look like a valid email. Could you double-check it?";
    case 'auth/weak-password':
      return "Your password seems a bit weak 😅 Try adding more characters, numbers, or symbols.";
    case 'auth/missing-password':
      return "Looks like you forgot to add a password! Please enter one to continue.";
    case 'auth/user-not-found':
      return "We couldn't find an account with that email. Want to create one instead?";
    case 'auth/wrong-password':
      return "Oops! That password doesn’t match our records. Could you try again?";
    case 'auth/network-request-failed':
      return "It seems your internet connection took a quick nap 💤. Check it and try again.";
    case 'auth/too-many-requests':
      return "You’ve tried a few times too quickly 😅. Let’s pause for a moment and try again soon.";
    case 'auth/internal-error':
      return "Something went wrong on our end 😔 Please try again in a moment.";
    case 'auth/missing-email':
      return "Could you add your email first? We’ll need it to get you signed in.";
    case 'auth/invalid-credential':
      return "Your login credentials don’t seem right. Please try again carefully.";
    case 'auth/popup-closed-by-user':
      return "You closed the sign-in window early 😅. Try again when you’re ready.";
    default:
      return "Whoops! Something unexpected happened. Please try again in a bit.";
  }
}
