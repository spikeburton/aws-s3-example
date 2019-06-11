class S3Controller < ApplicationController
  def direct_post
    render json: { msg: "Hello, World" }, status: :ok
  end
end
