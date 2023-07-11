export const jwtConfig = {
  useFactory: () => {
    return {
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60000s' },
    };
  },
};
