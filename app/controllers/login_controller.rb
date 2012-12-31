require 'digest/sha1'

class LoginController < ApplicationController
  def index
    print("login:" + params[:login])
	print("password:" + Digest::SHA1.hexdigest(params[:password]))
	@user = User.find_by_login_and_password(params[:login], Digest::SHA1.hexdigest(params[:password]))
	@result = @user != nil
	
	respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @result }
    end
  end
end
