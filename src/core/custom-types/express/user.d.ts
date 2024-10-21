declare namespace Express {
  interface Request {
    user: {
      id: string;
      name: string;
      email: string;
      companyId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}
