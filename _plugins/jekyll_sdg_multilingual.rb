# TODO: Move this to rubygems.org?
module JekyllSdgMultilingual
  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      # Make sure that the translated metadata contains a complete set of values
      # including non-translated metadata as a fallback. This allows us to treat
      # the translated metadata as complete when used in layouts and includes.
      if site.config['languages']
        site.config['languages'].each do |language|
          site.data['meta'].each do |indicator_id, meta|
            if meta[language]
              meta.each do |meta_key, meta_value|
                if meta_key != language && !meta[language][meta_key]
                  meta[language][meta_key] = meta_value
                end
              end
            end
          end
        end
      end
    end
  end
end
