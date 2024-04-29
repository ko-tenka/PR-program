interface IInputs {
    title: string,
    text: string,
    check1?: boolean
  }
  
  interface IPropsForm {
    inputs: IInputs,
    formHandler: React.ChangeEventHandler,
    submitHandler: React.FormEventHandler
  }
  
  interface IList {
    cards: IInputs[],
    // delHandler: (id: number) => void
  }
  
  interface IPost {
    id: number;
    title: string;
    description: string;
    // createdAt: Date;
    // updatedAt: Date;
  }

  interface IUser {
    id: number;
    login: string;
    email: string;
    password: string;
  }

  interface ILoginEmailPassword {
    login: string;
    email: string;
    password: string;
  }
  
  interface ILoginPassword {
    login: string;
    password: string;
  }
  export type PostsType = Array<IPost>;
  
  export type { IInputs, IPropsForm, IList, IPost, ILoginEmailPassword, IUser, ILoginPassword }
  