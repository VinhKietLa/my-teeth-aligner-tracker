Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://smileminder-dop2.onrender.com'  # Allow requests from your React app
    resource '*',  # Apply to all resources
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true  # Important for sessions and cookies
  end
end
