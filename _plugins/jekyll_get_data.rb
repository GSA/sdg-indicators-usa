require 'json'
require 'hash-joiner'
require 'open-uri'

module Jekyll_Get_Data
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)

      config = site.config['jekyll_get_data']
      if !config
        warn "No config".yellow
        return
      end
      if !config.kind_of?(Array)
        config = [config]
      end

      config.each do |d|
        begin
          target = site.data[d['data']]
          source = JSON.load(open(d['json']))

          if target
            HashJoiner.deep_merge target, source
          else
            site.data[d['data']] = source
          end

          # for each item, there should be the following:
            #

          # Dir.foreach(d['directory']) do |item|
          #   next if item == '.' or item == '..'
          #   # do work on real items
          #   warn "Debug: ".yellow + item
          #   File.write(File.join(d['directory'], 'shane' + item), 'Some glorious content')
          # end

          # if d['cache']
          #   data_source = (site.config['data_source'] || '_data')
          #   path = "#{data_source}/#{d['data']}.json"
          #   open(path, 'wb') do |file|
          #     file << JSON.generate(site.data[d['data']])
          #   end
          # end

        rescue
          next
        end
      end
    end
  end
end
