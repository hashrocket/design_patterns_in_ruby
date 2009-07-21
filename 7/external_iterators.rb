#!/usr/bin/ruby
# Ruby's standard library comes with the Generator and SyncEnumerator classes
# useful for creating external iterators from any enumerable collection
require 'generator'

range1 = [1, 2, 3, 4]
range2 = ['a', 'b', 'c', 'd', 'e']
range3 = ['h', 'a', 's', 'h']

# often encountered internal iterator
range1.each { |integer| puts integer }

# Create an external iterator from any enumerable object
external = Generator.new(range1)
puts external.next while external.next?

# Simultaneously iterate over three enumerable objects
SyncEnumerator.new(range1, range2, range3).each do |i, c1, c2|
  puts "#{i} #{c1} #{c2}"
end

# A block may optionally be passed to create an external iterator in place
even_generator = Generator.new do |gen|
  a = 0
  loop { gen.yield a += 2 }
end
10.times { puts even_generator.next }

# NOTE: Ruby 1.9 introduces external iterators into core
# external = enumerable_object.each
# external.next
