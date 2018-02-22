# FOR EXTRA CHALLENGE ONLY. YOU SHOULD NOT HAVE TO TOUCH THIS FILE.

require "sinatra"
require "json"
require 'pry'

set :bind, '0.0.0.0'  # bind to all interfaces
set :public_folder, File.join(File.dirname(__FILE__), "public")

get "/" do
  erb :home
end

get "/api/v1/favorite_things.json" do
  favorite_things = File.read("favorite_things.json")
end
