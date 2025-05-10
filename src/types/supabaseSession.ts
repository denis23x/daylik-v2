export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: 'bearer';
  user: {
    id: string;
    aud: string;
    role: string;
    email: string;
    phone: string;
    is_anonymous: boolean;
    created_at: string;
    updated_at: string;
    confirmed_at: string;
    email_confirmed_at: string;
    confirmation_sent_at: string;
    last_sign_in_at: string;
    app_metadata: {
      provider: string;
      providers: string[];
    };
    user_metadata: {
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
      sub: string;
    };
  };
};
