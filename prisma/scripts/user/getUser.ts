import { prisma } from "../../prisma";

const getUser = async (wallet_address: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        wallet_address,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { getUser };
