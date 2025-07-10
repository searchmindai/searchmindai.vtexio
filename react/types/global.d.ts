declare global {
  type WhatsAppProps = {
    phone?: string;
    message?: string;
    position?: "left" | "right";
    isActive?: boolean;
  };
}

export {};
